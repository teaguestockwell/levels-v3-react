import create, {State} from 'zustand'

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

export const ClientServerSyncStore = create<ClientServerSyncStateI>(set => ({
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