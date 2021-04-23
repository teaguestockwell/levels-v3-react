import {v4} from 'uuid'
import create, {State} from 'zustand'
import {AircraftDeep, Category} from '../types/aircraftDeep'
import {CargoSchema, getCargoSchema, getCargoStringsFromAirTanks} from '../util'
import {getActionsCS} from './cargo_store'
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

/** hook that will cause re-renders on aircraft change.
  When aircraft is changed, it will update the initial state of 
  the cargo and aircraft store to reflect the new aircraft, 
  by changing the cargo validation schema, and resting the chart c and 
  tanks to their initial state for that aircraft  
*/
export const useAirChangeStoreReset = () => {
  // given the actions to modify state inside cargo and aircraft store
  const cs = getActionsCS()
  const as = getActionsAS()

  // when a new aircraft is selected
  const air = AirStore(
    (s1) => s1.selectedAir,
    (s1, s2) => s1?.aircraftId === s2?.aircraftId
  ) as AircraftDeep

  // then
  // clear all cargos and remove config
  cs.resetCargoStore()

  // set cargo validation schema to schema from new aircraft
  as.setCargoSchema(getCargoSchema(air))

  // init cargo state from the new aircraft into cargo store
  cs.putCargos([
    // chart c
    {
      name: 'Basic Aircraft',
      weightEA: '0',
      fs: '0',
      qty: '1',
      isValid: false,
      uuid: v4(),
      category: Category.BasicAircraft,
    },
    // n tanks
    ...getCargoStringsFromAirTanks(air),
  ])

  // return the new aircraft + the hook that fires this func on air change.
  return air
}
