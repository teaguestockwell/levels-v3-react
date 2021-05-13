import create, {State} from 'zustand'

interface ClientServerSyncStateI extends State {
  isClientOnline: boolean
  isClientEqualToRes: boolean
  previousServerTimeStamp: number | undefined
  lastSyncTimeStamp: number | undefined

  setIsClientOnline: (isClientOnline:boolean) => void
  setIsClientEqualToRes: (isClientEqualToRes:boolean) => void
  setPreviousServerTimeStamp: (previousServerTimeStamp:number) => void
  setLastSyncTimeStamp: (lastSyncTimeStamp:number) => void
}

export const ClientServerSyncStore = create<ClientServerSyncStateI>(set => ({
  isClientOnline: false,
  isClientEqualToRes: true,
  // the init state to dif server against is the sw cache time stamp from clientData
  previousServerTimeStamp: undefined,
  lastSyncTimeStamp: undefined,

  setIsClientOnline: (isClientOnline) => set(s => {s.isClientOnline = isClientOnline}),
  setIsClientEqualToRes: (isClientEqualToRes) => set(s => {s.isClientEqualToRes = isClientEqualToRes}),
  setPreviousServerTimeStamp: (previousServerTimeStamp) => set(s => {s.previousServerTimeStamp = previousServerTimeStamp}),
  setLastSyncTimeStamp: (lastSyncTimeStamp) => set(s => {s.lastSyncTimeStamp = lastSyncTimeStamp})
}))

export const getActionsClientSyncStore = () => {
  const s = ClientServerSyncStore.getState()
  return {
    setIsClientOnline: s.setIsClientOnline,
    setIsClientEqualToRes: s.setIsClientEqualToRes,
    setPreviousServerTimeStamp: s.setPreviousServerTimeStamp,
    setLastSyncTimeStamp: s.setLastSyncTimeStamp,
  }
}