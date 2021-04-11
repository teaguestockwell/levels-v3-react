import create, {State} from 'zustand'
import {Const} from '../const'
import {Config} from '../types/aircraftDeep'
import {CargoString} from '../types/cargoString'
export interface CargoStoreState extends State {
  // read
  cargoValidMap: Map<string, boolean>
  cargoMap: Map<string, CargoString>
  config: Config
  configUuids: string[]

  // update 1 config
  putConfig: (config: Config) => void
  putConfigUuids: (uuids: string[]) => void

  // create | update n cargo
  putCargos: (cargos: CargoString[]) => void
  putCargosIsValid: (cargoIdValidMap: Map<string, boolean>) => void

  // delete n
  deleteCargosIsValid: (cargoIds: string[]) => void
  deleteCargos: (cargoIds: string[]) => void
  // when a new air is selected, reset all state
  resetCargoStore: () => void
}

export const selectCargoValidMap = (state:CargoStoreState) => state.cargoValidMap
export const selectCargoMap = (state:CargoStoreState) => state.cargoMap
export const selectConfig = (state:CargoStoreState) => state.config
export const selectConfigUuids = (state:CargoStoreState) => state.configUuids
export const selectCargoMapKeys = (state:CargoStoreState) => state.cargoMap.keys()




export const CargoStore = create<CargoStoreState>((set) => ({
  // read
  cargoValidMap: new Map(),
  cargoMap: new Map(),
  config: Const.NO_CONFIG,
  configUuids: [],

  // update 1 config
  putConfig: (config) =>
    set((state) => {
      state.config = config
    }),
  putConfigUuids: (uuids) =>
    set((state) => {
      state.configUuids = uuids
    }),

  // create | update n cargo
  putCargos: (cargos) =>
    set((state) => {
      cargos.forEach((c) => state.cargoMap.set(c.uuid, c))
    }),
  putCargosIsValid: (cargoIdValidMap) =>
    set((state) => {
      Array.from(cargoIdValidMap.entries()).forEach((entry) =>
        state.cargoValidMap.set(entry[0], entry[1])
      )
    }),

  // delete n
  deleteCargosIsValid: (cargoIds) =>
    set((state) => {
      cargoIds.forEach((id) => state.cargoValidMap.delete(id))
    }),
  deleteCargos: (cargoIds) =>
    set((state) => {
      cargoIds.forEach((id) => state.cargoMap.delete(id))
    }),
  // when a new air is selected, reset all state
  resetCargoStore: () =>
    set((state) => {
      state.cargoMap.clear()
      state.cargoValidMap.clear()
      state.config = Const.NO_CONFIG
      state.configUuids = []
      state.tankUuids = []
    }),
}))

export const getActionsCS = () => {
  const state = CargoStore.getState()
  return {
    putConfig: state.putConfig,
    putConfigUuids: state.putConfigUuids,
    putCargos: state.putCargos,
    putCargosIsValid: state.putCargosIsValid,
    deleteCargosIsValid: state.deleteCargosIsValid,
    deleteCargos: state.deleteCargos,
    resetCargoStore: state.resetCargoStore,
  }
}