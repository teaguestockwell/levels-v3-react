import create, {State} from 'zustand'
import {Aircraft} from '../types/aircraft'

export interface AirStoreState extends State {
  airs: Map<number, Aircraft>
  selectedAir: Aircraft | undefined
  setSelectedAir: (id: number) => void
  setAirs: (airs: Map<number, Aircraft>) => void
  //fetchAircrafts: () => Promise<void>
}

export const AircraftStore = create<AirStoreState>((set, get) => ({
  airs: new Map(),
  selectedAir: undefined,
  setSelectedAir: (id) =>
    set((state) => {
      state.selectedAir = get().airs.get(id)
    }),
  setAirs: (airs) =>
    set((state) => {
      state.airs = airs
    }),
  // fetchAircrafts: async () => {
  //   const newAircrafts = await UserService.getNAircraft()
  //   set((state) => {
  //     state.aircraftsMap = newAircrafts
  //   })
  // },
}))

// async function getAircrafts(): Promise<Map<number, Aircraft>> {
//   return new Map([
//     [
//       1,
//       {
//         id: 1,
//         name: 'C-17A-ER',
//         fs0: 80.5,
//         fs1: 2168,
//         mom0: 9999,
//         mom1: 50000,
//         weight0: 260000,
//         weight1: 300000,
//         cargoweight1: 300000,
//         lemac: 793.6,
//         mac: 309.5,
//         mommultiplyer: 10000,
//       },
//     ],
//     [
//       2,
//       {
//         id: 1,
//         name: 'C-17A',
//         fs0: 80.5,
//         fs1: 2168,
//         mom0: 9999,
//         mom1: 50000,
//         weight0: 260000,
//         weight1: 300000,
//         cargoweight1: 300000,
//         lemac: 793.6,
//         mac: 309.5,
//         mommultiplyer: 10000,
//       },
//     ],
//   ])
// }
