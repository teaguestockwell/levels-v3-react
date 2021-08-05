import { useEffect } from 'react'
import create  from 'zustand'
import { combine } from "zustand/middleware"
import { getN, usePolling, useUserAirs } from './query'
import {isEqual} from 'lodash'

export const useClientSyncStore = create(
  combine(
    {
      // A waiting area for a response from the api, that is newer data than what the client currently is using 
      pendingSync: {} as any,
      state: 'outdated' as 'outdated' | 'updateFetching' | 'updateNow'|  'offline'  | 'synced'
    },
    (set) => ({
      set,
    })
  )
)

const getState = (sync: any, clientCache: any) => {

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
      
    useClientSyncStore.setState({
      state: getState(sync ?? {}, clientCache),
    })

  },[sync?.clientReqKey])

  useEffect(() => {
    if(useClientSyncStore.getState().state === 'updateFetching'){
    getLastUpdated().then(x => {
      useClientSyncStore.setState({
        pendingSync: x,
        state: 'updateNow'
      })
    })
  }
  },[store1?.state])

  return useClientSyncStore(s => ({state: s.state, pendingSync: s.pendingSync}))
}