import create, {State} from 'zustand'

interface ClientServerSyncStateI extends State {
  previousServerTimeStamp: number | undefined
  lastSyncTimeStamp: number | undefined

  setPreviousServerTimeStamp: (previousServerTimeStamp:number) => void
  setLastSyncTimeStamp: (lastSyncTimeStamp:number) => void
}

export const ClientServerSyncStore = create<ClientServerSyncStateI>(set => ({
  previousServerTimeStamp: undefined,
  lastSyncTimeStamp: undefined,

  setPreviousServerTimeStamp: (previousServerTimeStamp) => set(s => {s.previousServerTimeStamp = previousServerTimeStamp}),
  setLastSyncTimeStamp: (lastSyncTimeStamp) => set(s => {s.lastSyncTimeStamp = lastSyncTimeStamp})
}))

export const getActionsClientSyncStore = () => {
  const s = ClientServerSyncStore.getState()
  return {
    setPreviousServerTimeStamp: s.setPreviousServerTimeStamp,
    setLastSyncTimeStamp: s.setLastSyncTimeStamp,
  }
}