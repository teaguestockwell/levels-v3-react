import create, {State} from 'zustand'
import {Aircraft} from '../types/aircraft'

export interface AirStoreState extends State {
  aircraftsMap: Map<number,Aircraft>
  fetchAircrafts: () => Promise<void>
  selectedAir: Aircraft | undefined
  setSelectedAircraft: (id: number) => void
}

export const AircraftStore = create<AirStoreState>((set, get) => ({
  aircraftsMap: new Map(),
  selectedAir: undefined,
  setSelectedAircraft: (id) => 
    set((state) => {
      state.selectedAir = get().aircraftsMap.get(id)
    }),
  fetchAircrafts: async () => {
    const newAircrafts = await getAircrafts()
    set((state) => {
      state.aircraftsMap = newAircrafts
    })
  },
}))


async function getAircrafts(): Promise<Map<number,Aircraft>> {
  return new Map([
    [1,{
      id: 1,
      name: 'C-17A-ER',
      fs0: 80.5,
      fs1: 2168,
      mom0: 9999,
      mom1: 50000,
      weight0: 260000,
      weight1: 300000,
      cargoweight1: 300000,
      lemac: 793.6,
      mac: 309.5,
      mommultiplyer: 10000,
    }],
    [2,{
      id: 1,
      name: 'C-17A',
      fs0: 80.5,
      fs1: 2168,
      mom0: 9999,
      mom1: 50000,
      weight0: 260000,
      weight1: 300000,
      cargoweight1: 300000,
      lemac: 793.6,
      mac: 309.5,
      mommultiplyer: 10000,
    }]
  ])
}
