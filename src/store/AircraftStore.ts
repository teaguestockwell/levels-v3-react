import create, {State} from 'zustand'
import {AircraftDeep} from '../types/aircraftDeep'

export interface AirStoreState extends State {
  selectedAir: AircraftDeep | undefined
  setSelectedAir: (air: AircraftDeep) => void
}

export const AirStore = create<AirStoreState>((set) => ({
  selectedAir: undefined,
  setSelectedAir: (air) =>
    set((state) => {
      state.selectedAir = air
    }),
}))
