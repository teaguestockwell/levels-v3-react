import create from 'zustand'
import {combine} from 'zustand/middleware'
import {getN, usePolling, useUserAirs} from './query'
import {useEffect} from 'react'
import {AircraftDeep} from '../types/aircraftDeep'
import {stringify} from 'query-string'
import {queryClient} from '../utils/const'
import {isEqual} from 'lodash'

// these hooks and components handle the lifecycle of updating offline cache
// and making sure it is in sync with the server
// here is a diagram: https://jamboard.google.com/d/1f3VnD6dKJcEM5IyNfnAQs940UIbMe4eMGhfKfl8MmZI/edit?usp=sharing

// these map to colors inside of the ui to show the client the state of the offline cache,
// for example, if the cache is updatable they when they click into the sync modal, the user will be able to
// confirm they would like to accept the updated state from the server into the application.
// the user chooses to accept this because it resets the state of any configurations they have made
// in exchange for the newest data
export enum CacheState {
  OUTDATED = 'outdated',
  OFFLINE = 'offline',
  FETCHING = 'fetching',
  UPDATABLE = 'updatable',
  SYNCED = 'synced',
}

// api/aircraft/client-server-sync?1=uuid&2=uuid&3=uuid
// this endpoint polled with the query string of the current state of the clients active aircraft
// the query string is built from the dataState prop of react query client cache
// because the api updated the deepHashId of an aircraft when one of its fk models changes,
// the api can tell us if we have an outdated query without having to send us a new query to diff
// key:aircraftId, value:deepHashId
type DataState = Record<number, string>

// the response from get /aircraft/lastUpdated
interface API_lastUpdated {
  serverEpoch: number
  dataState: DataState
  data: AircraftDeep[]
}

// when the client is not synced with the server, the /lastUpdated ep should be called
// the response from that should then be set as pendingAircrafts cache
interface API_ClientServerSync {
  isClientSyncedWithServer: boolean
  serverEpoch: number
  dataState: DataState
}

const useClientSyncStore = create(
  combine(
    {
      //  pendingAircrafts
      // this is a holding area for the aircraft returned from lastUpdated while they are waiting to be applied by the user
      // if pendingAircrafts is defined, the user may choose to apply it to the userAirs cache of react query
      pendingRqClientCache: null as API_lastUpdated | null,
      state: 'outdated' as CacheState,
      // while the getNewLastUpdated method is running, do not re poll /api/aircraft/client-server-sync
      isDebouncing: false as boolean,
    },
    (set) => ({
      set,
    })
  )
)

// userAirs react query cache
// this cache defines the state of the aircrafts the user is interacting with
// when a user applies a pendingAircrafts, the useUserAirs hook fires and execution jumps to the initLoaded component
// this file should then resume polling the /client-server-sync for further pending changes
export const acceptPendingRqCache = () => {
  const pendingCache = useClientSyncStore.getState().pendingRqClientCache

  if (!pendingCache) {
    throw new Error(
      'cannot apply pending cache because its null. Do not render the sync now button if there is no cache'
    )
  }

  // lastSync in local cache will be set inside of initLoaded from the new data epoch
  queryClient.setQueryData('userAirs', () => pendingCache)

  useClientSyncStore.setState({
    state: CacheState.SYNCED,
    pendingRqClientCache: null,
  })
}

// local storage lastSyncedEpoch
// the service worker does not refetch /aircraft/lastUpdated if /client-server-sync responds that the current cache is up to date
// if the application where to reload while the cached response of the service worker has a serverEpoch older than 2 days ago,
// even if the /client-server-sync reported that it was up to date, the ui will mark this a outdated state
// to prevent this, every time the /client-server-sync is called, the local storage lastSyncedEpoch is set to the serverEpoch
// it gets the lastSync from local storage as a number
// it falls back to 0
const getLastSyncEpoch = () => {
  const lastSyncString = localStorage.getItem('lastSync')
  try {
    return Number(lastSyncString)
  } catch (e) {
    return 0
  }
}

// given an epoch as a number,
// when it is 48 hours old
// then return true, else return false
const getIsOutdated = (epoch: number) => {
  if (Date.now() - epoch > 1000 * 60 * 60 * 24 * 2) {
    return true
  }

  return false
}

// given a response is received from the service worker
// when it's server epoch is older than 5 seconds ago
// then return true, else return false
const getIsCached = (epoch: number) => {
  if (Date.now() - epoch > 1000 * 5) {
    return true
  }

  return false
}

// service worker cache
// registered to api/aircraft/lastUpdated
// implemented using workbox stale while revalidate https://developers.google.com/web/tools/workbox/modules/workbox-strategies#stale-while-revalidate
// this cache is the initial starting point for the app
// a user that is online may briefly interact with stale data before this file's lifecycle prompts them to update by setting pendingAircrafts
// to the latest res
const getNewLastUpdated = async (): Promise<API_lastUpdated | null> => {
  let res
  let numTrys = 0

  while (!res && numTrys < 5) {
    // this will resolve when offline because of sw cache
    res = await getN('aircraft/lastUpdated')

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

const handleFetchLastUpdated = async (): Promise<void> => {
  useClientSyncStore.setState({isDebouncing: true})
  const newLastUpdated = await getNewLastUpdated()

  // while rqCache is outdated, try to fetch it
  if (!newLastUpdated) {
    useClientSyncStore.setState({isDebouncing: false})
    return
  }

  useClientSyncStore.setState({
    pendingRqClientCache: newLastUpdated,
    state: CacheState.UPDATABLE,
    isDebouncing: false,
  })
}

const getState = (clientServerSync: any): CacheState => {
  if (clientServerSync?.isClientSyncedWithServer) {
    localStorage.setItem('lastSync', `${clientServerSync.serverEpoch}`)
    return CacheState.SYNCED
  }

  if (getIsOutdated(getLastSyncEpoch())) {
    return CacheState.OUTDATED
  }

  if (navigator.onLine) {
    return CacheState.FETCHING
  }

  return CacheState.OFFLINE
}

// this is a glorified switch statement
// https://ultimatecourses.com/blog/deprecating-the-switch-statement-for-object-literals
const getStateHandler: Record<CacheState, () => Promise<void>> = {
  [CacheState.OUTDATED]: async () => {
    return await handleFetchLastUpdated()
  },
  [CacheState.OFFLINE]: async () => {
    // do not get lastUpdated,
    // return to do nothing until back online
    return
  },
  [CacheState.FETCHING]: async () => {
    return await handleFetchLastUpdated()
  },
  [CacheState.UPDATABLE]: async () => {
    throw new Error(
      'Poll should not run when there is pending react query cache'
    )
  },
  [CacheState.SYNCED]: async () => {
    // do not get lastUpdated,
    // return to do nothing until state is not synced
    return
  },
}

const Poll = ({rqCache}: {rqCache: any}) => {
  // api/aircraft/client-server-sync?1=uuid&2=uuid&3=uuid
  // where 1 is an aircraftId and uuid is the deepHashId that represents the state of that aircraft
  const ep = 'aircraft/client-server-sync?' + stringify(rqCache.dataState)
  const {
    data,
  }: {
    data: (API_ClientServerSync & {clientReqKey: string}) | null | undefined
  } = usePolling(ep, 3000, true)

  useEffect(() => {
    const state = getState(data)
    useClientSyncStore.setState({state})
    getStateHandler[state]()
  }, [data?.clientReqKey])

  return null
}

export const UseOfflineCache = () => {
  const {data: rqCache} = useUserAirs()
  const pendingRqClientCache = useClientSyncStore(
    (s) => s.pendingRqClientCache,
    (s0, s1) => isEqual(s0?.dataState, s1?.dataState)
  )

  return {
    pollComponent: pendingRqClientCache ? null : <Poll rqCache={rqCache} />,
    stateSelector: () => useClientSyncStore(s => s.state),
    syncNow: acceptPendingRqCache
  }
}

