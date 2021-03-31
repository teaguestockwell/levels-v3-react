import create, {State} from 'zustand'
import {Aircraft} from '../types/aircraft'

export interface AirStoreState extends State {
  selectedAir: Aircraft | undefined
  setSelectedAir: (air: Aircraft) => void
}

export const AirStore = create<AirStoreState>((set) => ({
  selectedAir: undefined,
  setSelectedAir: (air) =>
    set((state) => {
      state.selectedAir = air
    }),
}))
