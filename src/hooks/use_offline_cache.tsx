/* eslint-disable react/display-name */
import create from 'zustand'
import {combine, devtools} from 'zustand/middleware'
import {getN, usePolling, useUserAirs} from './query'
import {stringify} from 'query-string'
import {queryClient} from '../utils/const'
import {isEqual} from 'lodash'
import React from 'react'
import isNumber from 'is-number'
import  * as Types from '../types'
import { message } from 'antd'

// these hooks and components handle the lifecycle of updating offline cache
// and making sure it is in sync with the server
// here is a diagram: https://fivelevel.page.link/levels-offline-cache



// when the client is not synced with the server, the aircraft/deep ep should be called
// the response from that should then be set as pendingAircrafts cache

export const useClientSyncStore = create(
  devtools(
    combine(
      {
        //  pendingAircrafts
        // this is a holding area for the aircraft returned from aircraft/deep while they are waiting to be applied by the user
        // if pendingAircrafts is defined, the user may choose to apply it to the userAirs cache of react query
        pendingRqClientCache: null as Types.EpAircraftDeep | null,
        state: Types.OfflineCacheState.OUTDATED as Types.OfflineCacheState,
        // while the getNewNewAircraftDeep method is running, do not re poll /api/aircraft/client-server-sync
        isDebouncing: false as boolean,
      },
      (set) => ({
        set,
      })
    ),
    {
      name: 'client-server-sync'
    }
  )
)

// userAirs react query cache
// this cache defines the state of the aircrafts the user is interacting with
// when a user applies a pendingAircrafts, the useUserAirs hook fires and execution jumps to the initLoaded component
// this file should then resume polling the /client-server-sync for further pending changes
export const acceptPendingRqCache = () => {
  const pendingCache = useClientSyncStore.getState().pendingRqClientCache

  if (!pendingCache) {throw new Error('cannot apply pending cache because its null. Do not render the sync now button if there is no cache')}

  // lastSync in local cache will be set inside of initLoaded from the new data epoch
  queryClient.setQueryData('userAirs', () => pendingCache)

  useClientSyncStore.setState({
    state: Types.OfflineCacheState.SYNCED,
    pendingRqClientCache: null,
  })
}

// local storage lastSyncedEpoch
// the service worker does not refetch /aircraft/deep if /client-server-sync responds that the current cache is up to date
// if the application where to reload while the cached response of the service worker has a serverEpoch older than 2 days ago,
// even if the /client-server-sync reported that it was up to date, the ui will mark this a outdated state
// to prevent this, every time the /client-server-sync is called, the local storage lastSyncedEpoch is set to the serverEpoch
// it gets the lastSync from local storage as a number
// it falls back to 0
export const getLastSyncEpoch = () => {
  const lastSyncString = localStorage.getItem('lastSync') ?? '0'
  const num = parseInt(lastSyncString)
  return isNumber(num) ? num : 0
}

// given an epoch as a number,
// when it is 48 hours old
// then return true, else return false
export const getIsOutdated = (epoch: number) => {
  if (Date.now() - epoch > (1000 * 60 * 60 * 24 * 2)) {
    return true
  }

  return false
}

// given a response is received from the service worker
// when it's server epoch is older than 5 seconds ago
// then return true, else return false
export const getIsCached = (epoch: number) => {
  if (Date.now() - epoch > (1000 * 5)) {
    return true
  }

  return false
}

// service worker cache
// registered to api/aircraft/deep
// implemented using workbox stale while revalidate https://developers.google.com/web/tools/workbox/modules/workbox-strategies#stale-while-revalidate
// this cache is the initial starting point for the app
// a user that is online may briefly interact with stale data before this file's lifecycle prompts them to update by setting pendingAircrafts
// to the latest res
export const getNewAircraftDeep = async (): Promise<Types.EpAircraftDeep | null> => {
  let res
  let numTrys = 0

  while (!res && numTrys < 5) {
    // this will resolve when offline because of sw cache
    res = await getN('aircraft/deep')

    // if it resolves, verify that it is not cached before returning it as new
    if (
      res &&
      !getIsOutdated(res.serverEpoch ?? 0) &&
      !getIsCached(res.serverEpoch ?? 0)
    ) {
      return res
    }

    numTrys++
  }

  return null
}

export const handleFetchAircraftDeep = async (): Promise<void> => {
  useClientSyncStore.setState({isDebouncing: true})
  const newAircraftsDeep = await getNewAircraftDeep()

  // while rqCache is outdated, try to fetch it
  if (!newAircraftsDeep) {useClientSyncStore.setState({isDebouncing: false}); return}

  useClientSyncStore.setState({
    pendingRqClientCache: newAircraftsDeep,
    state: Types.OfflineCacheState.UPDATABLE,
    isDebouncing: false,
  })
}

// if aircraft/deep is fetched before the service work is registered
// then there would be no offline cache to fallback to without explicity
// fetching the aircraft/deep again because use_offline_cache does not
// send another req to aircraft/deep until the global state is out of sync with the server
let isCached = false

export const useInitCache = async (): Promise<void> => {
  while(!isCached && location.protocol === 'https:') {
    
    // is there cache available?
    const cache = await caches.open('aircraft-deep')
    const reqs = await cache.keys() ?? []
    isCached = reqs.length > 0
    
    if(isCached){
      message.success({key: 'offline-toast', content: 'Cached for offline use'})
    } else{
      await getNewAircraftDeep()
    }

    // throttle to once every 3 seconds
    await new Promise(resolve => setTimeout(resolve, 3000))
  }
}

export const getState = (clientServerSync: any): Types.OfflineCacheState => {
  if (clientServerSync?.isClientSyncedWithServer) {
    localStorage.setItem('lastSync', `${clientServerSync.serverEpoch}`)
    message.destroy('refresh-cookie')
    return Types.OfflineCacheState.SYNCED
  }

  if (getIsOutdated(getLastSyncEpoch())) {
    return Types.OfflineCacheState.OUTDATED
  }

  if (navigator.onLine) {
    return Types.OfflineCacheState.FETCHING
  }

  message.destroy('refresh-cookie')
  return Types.OfflineCacheState.OFFLINE
}

// this is a glorified switch statement
// https://ultimatecourses.com/blog/deprecating-the-switch-statement-for-object-literals
export const getStateHandler: Record<Types.OfflineCacheState, () => Promise<void>> = {
  [Types.OfflineCacheState.OUTDATED]: async () => {
    return handleFetchAircraftDeep()
  },
  [Types.OfflineCacheState.OFFLINE]: async () => {
    // do not get aircraft/deep while offline,
    // return to do nothing until back online
    return
  },
  [Types.OfflineCacheState.FETCHING]: async () => {
    return handleFetchAircraftDeep()
  },
  [Types.OfflineCacheState.UPDATABLE]: async () => {
    throw new Error('Poll should not run when there is pending react query cache')
  },
  [Types.OfflineCacheState.SYNCED]: async () => {
    // do not get aircraft/deep while synced,
    // return to do nothing until state is not synced
    return
  },
}

// eslint-disable-next-line react/display-name
export const Poll = React.memo(({ep}: {ep:string}) => {
  const {
    data,
  }: {
    data: (Types.EpAircraftClientServerSync & {clientReqKey: string}) | null | undefined
  } = usePolling(ep, 3000, true)

  React.useEffect(() => {
    // data should always be defined because use polling uses the getN axios wrapper
    // this returns an object even if the request timed out
    if(data){ 
      const state = getState(data)
      useClientSyncStore.setState({state})
      getStateHandler[state]()
    }
  }, [data?.clientReqKey])

  return null
})

export const UseOfflineCache = () => {
  const clientDataState = useUserAirs()?.data?.dataState
  // api/aircraft/client-server-sync?1=uuid&2=uuid&3=uuid
  // where 1 is an aircraftId and uuid is the deepHashId that represents the state of that aircraft
  const ep = 'aircraft/client-server-sync?' + stringify(clientDataState)

  const pendingRqClientCache = useClientSyncStore(
    (s) => s.pendingRqClientCache,
    (s0, s1) => isEqual(s0?.dataState, s1?.dataState)
  )

  React.useRef(useInitCache())

  return {
    pollComponent: pendingRqClientCache ? null : <Poll ep={ep} />,
    stateSelector: () => useClientSyncStore(s => s.state),
    syncNow: acceptPendingRqCache
  }
}

