import { isEqual } from "lodash"
import { useEffect } from "react"
import { useUserAirs, useUserAirsPolling } from "./use_user_airs"
import create, {State} from 'zustand'
import {queryClient} from '../const'

interface ClientServerSyncStateI extends State {
  previousServerTimeStamp: number | undefined
  lastSyncTimeStamp: number | undefined
  isClientEqualToRes: boolean
  isClientOnline: boolean

  setPreviousServerTimeStamp: (previousServerTimeStamp:number) => void
  setLastSyncTimeStamp: (lastSyncTimeStamp:number) => void
  setIsClientEqualToRes: (isClientEqualToRes: boolean) => void
  setIsClientOnline: (isClientOnline: boolean) => void
}

const ClientServerSyncStore = create<ClientServerSyncStateI>(set => ({
  previousServerTimeStamp: undefined,
  lastSyncTimeStamp: undefined,
  isClientEqualToRes: true,
  isClientOnline: false,

  setPreviousServerTimeStamp: (previousServerTimeStamp) => set(s => {s.previousServerTimeStamp = previousServerTimeStamp}),
  setLastSyncTimeStamp: (lastSyncTimeStamp) => set(s => {s.lastSyncTimeStamp = lastSyncTimeStamp}),
  setIsClientEqualToRes: (isClientEqualToRes) => set(s => {s.isClientEqualToRes = isClientEqualToRes}),
  setIsClientOnline: (isClientOnline) => set(s => {s.isClientOnline = isClientOnline})
}))

export const getActionsClientSyncStore = () => {
  const s = ClientServerSyncStore.getState()
  return {
    setPreviousServerTimeStamp: s.setPreviousServerTimeStamp,
    setLastSyncTimeStamp: s.setLastSyncTimeStamp,
    setIsClientEqualToRes: s.setIsClientEqualToRes,
    setIsClientOnline: s.setIsClientOnline
  }
}

// ref to global store state updating functions
const ss = getActionsClientSyncStore()

export const useUserServerSync = () => {
  // the data that the client has loaded
  const { data: clientData } = useUserAirs()

  // poll the server | service worker
  const { data: serverData } = useUserAirsPolling()

  // every time there is a new res
  useEffect(() => {

    // fallback if service worker does not return cache
    if (!serverData) {
      ss.setIsClientEqualToRes(true)
      ss.setIsClientOnline(false)
    }

    if (serverData) {
      const gs = ClientServerSyncStore.getState()

      // are the preloaded aircraft stale?
      const isClientEqualToRes = isEqual(clientData.airs, serverData.airs)

      // if server timeStamp1 === timestamp2, res is from service worker cache
      const isClientOnline = serverData.lastUpdated !== gs.previousServerTimeStamp

      // client res equality does not mean client is synced with server because the res could have been cached 
      const isClientSyncedWithServer = isClientEqualToRes && isClientOnline

      ss.setLastSyncTimeStamp(isClientSyncedWithServer ? serverData.lastUpdated : gs.lastSyncTimeStamp)
      ss.setPreviousServerTimeStamp(serverData.lastUpdated)
      ss.setIsClientEqualToRes(isClientEqualToRes)
      ss.setIsClientOnline(isClientOnline)
    }
    // key is unique to each res regardless is it is from service worker cache
  }, [serverData?.key])

  const gs = ClientServerSyncStore.getState()

  return {
    isClientOnline: gs.isClientOnline,
    isClientEqualToRes: gs.isClientEqualToRes,
    lastSyncTimeStamp: gs.lastSyncTimeStamp,
    previousServerTimeStamp: gs.previousServerTimeStamp,
    serverData,

    // was the client synced with the server over 48 hours ago?
    isClientStale: Date.now() - (gs.lastSyncTimeStamp as number) > 172800000,

    // client res equality does not mean client is synced with server because the res could have been cached 
    isClientSyncedWithServer: gs.isClientEqualToRes && gs.isClientOnline,

    //invalidate initLoaded to reset app
    syncClientAndServerState: () => queryClient.setQueryData('userAirs', () => serverData)
  }
}