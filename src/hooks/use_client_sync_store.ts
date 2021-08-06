import { useEffect } from 'react'
import create  from 'zustand'
import { combine } from "zustand/middleware"
import { getN, usePolling, useUserAirs } from './query'
import {isEqual} from 'lodash'

export const useClientSyncStore = create(
  combine(
    {
      // A waiting area for a response from the api, that is newer data than what the client currently is using 
      pendingAircrafts: null as any,
      state: 'outdated' as 'outdated' | 'updateFetching' | 'updateNow'|  'offline'  | 'synced'
    },
    (set) => ({
      set,
    })
  )
)

const getState = (sync: any, clientCache: any) => {
  /**
  
  api/client-server-sync?1=uuid&2=uuid&3=uuid 

  this endpoint polled with the query string of the current state of the clients active aircraft
  the query string is built from the dataState prop of react query client cache
  because the api updated the deepHashId of an aircraft when one of its fk models changes, 
  the api can tell us if we have an outdated query without having to send us a new query to diff 
  this endpoint returns {
    isClientSyncedWithServer: boolean, 
    serverEpoch: number,
    dataState: {[key: string as aircraftId]: string as deepHashId}
  }
  when the client is not synced with the server, the /lastUpdated ep should be called
  the response from that should then be set as pendingAircrafts cache
  

  pendingAircrafts

  this is a holding area for the aircraft returned from lastUpdated while they are waiting to be applied by the user
  if pendingAircrafts is defined, the user may choose to apply it to the userAirs cache of react query

  userAirs react query cache

  this cache defines the state of the aircrafts the user is interacting with
  when a user applies a pendingAircrafts, the useUserAirs hook fires and execution jumps to the initLoaded component
  this file should then resume polling the /client-server-sync for further pending changes

  service worker cache 
  registered to api/aircraft/lastUpdated
  implemented using workbox stale while revalidate https://developers.google.com/web/tools/workbox/modules/workbox-strategies#stale-while-revalidate 
  this cache is the initial starting point for the app
  a user that is online may befiely interact with stale data before this file's lifecycle prompts them to update by setting pendingAircrafts
  to the latest res 

  local storage lastSyncedEpoch
  the service worker does not refetch /aircraft/lastUpdated if /client-server-sync responds that the current cache is up to date
  if the application where to reload while the cached response of the service worker has a serverEpoch older than 2 days ago,
  even if the /client-server-sync reported that it was up to date, the ui will mark this a outdated state
  to prevent this, every time the /client-server-sync is called, the local storage lastSyncedEpoch is set to the serverEpoch

  */ 

  if(sync?.isClientSyncedWithServer){
    localStorage.setItem('lastSync', `${sync.serverEpoch}`)
  }

  if(Date.now() - Number(localStorage.getItem('lastSync')) > (100 * 60 * 60 * 24 * 2)){
    return 'outdated'
  }

  if(useClientSyncStore.getState().state !== 'updateNow' && sync?.isClientSyncedWithServer === false){
    return 'updateFetching'
  }

  if(!sync?.isClientSyncedWithServer && sync?.dataState && !isEqual(sync?.dataState, clientCache?.dataState)){
    return 'updateNow'
  }

  if(!navigator.onLine || sync?.isClientSyncedWithServer === undefined){
    return 'offline'
  }
  
  if(sync?.isClientSyncedWithServer === true){
    return 'synced'
  }

  throw new Error('client sync store has undefined state')
}

const getLastUpdated = async () => {
  let res
  for (let i = 0; i < 30; i++) {
    // return from cache once it loads
    if(!res){
      try{
      res = await getN('aircraft/lastUpdated')
      // eslint-disable-next-line no-empty
      }catch(e){}
    } else{
      return res
    }
  } 
  
  throw new Error('time out waiting for /aircraft/lastUpdated')
}

export const useServerSync = () => {
  const {data: clientCache} = useUserAirs()
  const qs = Object.keys(clientCache.dataState).map(key => `${key}=${clientCache.dataState[key]}`).join('&')
  const {data: sync} = usePolling(`aircraft/client-server-sync?${qs}`, 3000, true)
  const store1 = useClientSyncStore()

  useEffect(() => {
    if(sync){
      useClientSyncStore.setState({
        state: getState(sync ?? {}, clientCache),
      })
    }
  },[sync?.clientReqKey])

  useEffect(() => {
    if(useClientSyncStore.getState().state === 'updateFetching'){
    getLastUpdated().then(x => {
      useClientSyncStore.setState({
        pendingAircrafts: x,
        state: 'updateNow'
      })
    })
  }
  },[store1?.state])

  return useClientSyncStore(s => ({state: s.state, pendingAircrafts: s.pendingAircrafts}))
}