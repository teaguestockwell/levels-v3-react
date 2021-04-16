import { v4 } from 'uuid'
import create, {State} from 'zustand'
import {AircraftDeep, Category} from '../types/aircraftDeep'
import {CargoSchema, getCargoSchema, getCargoStringsFromAirTanks} from '../util'
import { getActionsCS } from './cargo_store'
export interface AirStoreState extends State {
  selectedAir: AircraftDeep | undefined
  cargoSchema: CargoSchema | undefined
  setCargoSchema: (cargoSchema: CargoSchema) => void
  setSelectedAir: (air: AircraftDeep) => void
}

export const selectActionsAS = (state: AirStoreState) => ({
  setCargoSchema: state.setCargoSchema,
  setSelectedAir: state.setSelectedAir,
})

export const AirStore = create<AirStoreState>((set) => ({
  selectedAir: undefined,
  cargoSchema: undefined,
  setCargoSchema: (cargoSchema) =>
    set((state) => {
      state.cargoSchema = cargoSchema
    }),
  setSelectedAir: (air) =>
    set((state) => {
      state.selectedAir = air
    }),
}))

export const getAir = () => AirStore.getState().selectedAir as AircraftDeep
export const getSchema = () => AirStore.getState().cargoSchema as CargoSchema
export const getActionsAS = () => {
  const state = AirStore.getState()
  return {
    setCargoSchema: state.setCargoSchema,
    setSelectedAir: state.setSelectedAir,
  }
}

export const useSelectedAirSideEffects = () => {
  const air = AirStore(s1 => s1.selectedAir, (s1,s2) => s1?.aircraftId === s2?.aircraftId) as AircraftDeep

  const cs = getActionsCS()
  const as = getActionsAS()

  cs.resetCargoStore()
  as.setCargoSchema(getCargoSchema(air))
  cs.putCargos([
    {
      name: 'Basic Aircraft',
      weightEA: '0',
      fs: '0',
      qty: '1',
      isValid: false,
      uuid: v4(),
      category: Category.BasicAircraft 
    },
    ...getCargoStringsFromAirTanks(air), 
  ])
    return air
}
