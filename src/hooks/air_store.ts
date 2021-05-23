export {}

// import {isEqual} from 'lodash'
// import {v4} from 'uuid'
// import create, {State} from 'zustand'
// import {AircraftDeep, Category} from '../types/aircraftDeep'
// import {
//   CargoSchema,
//   getCargoSchema,
//   getCargoStringsFromAirTanks,
// } from '../utils/util'
// import {getActionsCS} from './user_store'
// export interface userStoreState extends State {
//   selectedAir: AircraftDeep | undefined
//   cargoSchema: CargoSchema | undefined
//   putCargoSchema: (cargoSchema: CargoSchema) => void
//   putSelectedAir: (air: AircraftDeep) => void
// }

// export const selectActionsAS = (state: userStoreState) => ({
//   putCargoSchema: state.putCargoSchema,
//   putSelectedAir: state.putSelectedAir,
// })

// export const userStore = create<userStoreState>((set) => ({
//   selectedAir: undefined,
//   cargoSchema: undefined,
//   putCargoSchema: (cargoSchema) =>
//     set((state) => {
//       state.cargoSchema = cargoSchema
//     }),
//   putSelectedAir: (air) => {
//     set((state) => {
//       state.selectedAir = air
//     })
//   },
// }))

// export const getAir = () => userStore.getState().selectedAir as AircraftDeep
// export const getSchema = () => userStore.getState().cargoSchema as CargoSchema
// export const getUserActions = () => {
//   const state = userStore.getState()
//   return {
//     putCargoSchema: state.putCargoSchema,
//     putSelectedAir: state.putSelectedAir,
//   }
// }
// export const useAirId = () => userStore((x) => x.selectedAir?.aircraftId)

// export const initAirCargos = (air: AircraftDeep) => {
//   const cs = getActionsCS()
//   const as = getUserActions()

//   cs.resetCargoStore()

//   // set cargo validation schema to schema from new aircraft
//   as.putCargoSchema(getCargoSchema(air))

//   // init cargo state from the new aircraft into cargo store
//   cs.putCargos([
//     // chart c
//     {
//       name: 'Basic Aircraft',
//       weightEA: '0',
//       fs: '0',
//       qty: '1',
//       isValid: false,
//       uuid: v4(),
//       category: Category.BasicAircraft,
//     },
//     // n tanks
//     ...getCargoStringsFromAirTanks(air),
//   ])
// }

// /** hook that will cause re-renders on aircraft change.
//   When aircraft is changed, it will update the initial state of 
//   the cargo and aircraft store to reflect the new aircraft, 
//   by changing the cargo validation schema, and resting the chart c and 
//   tanks to their initial state for that aircraft  
// */
// export const useAirChangeStoreReset = () => {
//   // when a new aircraft is selected
//   const air = userStore(
//     (s1) => s1.selectedAir,
//     (s1, s2) => s1?.aircraftId === s2?.aircraftId
//   ) as AircraftDeep

//   initAirCargos(air)

//   // return the new aircraft + the hook that fires this func on air change.
//   return air
// }

// export const useUserAir = () =>
//   userStore(
//     (s) => s.selectedAir,
//     (s1, s2) => isEqual(s1, s2)
//   )
