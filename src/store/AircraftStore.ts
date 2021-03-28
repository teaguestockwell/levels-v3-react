import create, {State} from 'zustand'
import {IAircraft} from '../types/IAircraft'

interface IStore extends State {
  aircraftsMap: Map<number,IAircraft>
  fetchAircrafts: () => Promise<void>
  selectedAirId: number | undefined
  setSelectedAircraft: (id: number) => void
}

export const AircraftStore = create<IStore>((set) => ({
  aircraftsMap: new Map(),
  selectedAirId: undefined,
  setSelectedAircraft: (id) => 
    set((state) => {
      state.selectedAirId = id
    }),
  fetchAircrafts: async () => {
    const newAircrafts = await getAircrafts()
    set((state) => {
      state.aircraftsMap = newAircrafts
    })
  },
}))


async function getAircrafts(): Promise<Map<number,IAircraft>> {
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
