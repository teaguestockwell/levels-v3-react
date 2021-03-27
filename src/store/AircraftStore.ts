import create, {State} from 'zustand'
import { IAircraft} from '../types/IAircraft'

interface IStore extends State {
  setSelectedAircraft: (id: number) => void
  fetchAircrafts: () => Promise<void>
  aircrafts: IAircraft[]
  selectedAircraft: IAircraft | null
}

export const AircraftStore = create<IStore>(set => ({
  aircrafts: [],
  selectedAircraft: null,
  setSelectedAircraft: async (id) => 
    set((state) => {
      state.selectedAircraft = setSelectedAircraftHandler(state.aircrafts, id)
    }),
  fetchAircrafts: async () => {
    const newAircrafts = await getAircrafts()
    set((state) => {
      state.aircrafts = newAircrafts
  })}
}))

function setSelectedAircraftHandler(aircrafts: IAircraft[], selectId:number): IAircraft{
  return aircrafts.filter(x => x.id === selectId)[0]
}

async function getAircrafts():Promise<IAircraft[]> {
  return [
    {
      "id": 1,
      "name": "C-17A-ER",
      "fs0": 80.5,
      "fs1": 2168,
      "mom0": 9999,
      "mom1": 50000,
      "weight0": 260000,
      "weight1": 300000,
      "cargoweight1": 300000,
      "lemac": 793.6,
      "mac": 309.5,
      "mommultiplyer": 10000,
    },
    {
      "id": 2,
      "name": "C-17A",
      "fs0": 80.5,
      "fs1": 2168,
      "mom0": 9999,
      "mom1": 50000,
      "weight0": 260000,
      "weight1": 300000,
      "cargoweight1": 300000,
      "lemac": 793.6,
      "mac": 309.5,
      "mommultiplyer": 10000,
    }
  ]
}
