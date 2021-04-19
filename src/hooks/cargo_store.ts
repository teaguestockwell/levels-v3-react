import create, {State} from 'zustand'
import {Const} from '../const'
import {Config} from '../types/aircraftDeep'
import {CargoString} from '../types/cargoString'
import isEqual from 'lodash/isEqual'
export interface CargoStoreState extends State {
  // read
  cargoMap: Map<string, CargoString>
  config: Config

  // update 1 config
  putConfig: (config: Config) => void

  // create | update n cargo
  putCargos: (cargos: CargoString[]) => void

  // delete n
  deleteCargos: (cargoIds: string[]) => void
  // when a new air is selected, reset all state
  resetCargoStore: () => void
}

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

  // create | update n cargo
  putCargos: (cargos) =>
    set((state) => {
      cargos.forEach((c) => state.cargoMap.set(c.uuid, c))
    }),

  // delete n
  deleteCargos: (cargoIds) =>
    set((state) => {
      cargoIds.forEach((id) => state.cargoMap.delete(id))
    }),
  // when a new air is selected, reset all state
  resetCargoStore: () =>
    set((state) => {
      state.cargoMap.clear()
      state.config = Const.NO_CONFIG
    }),
}))

const isCargoValid = (s: CargoStoreState) => Array.from(s.cargoMap.values()).every(c => c.isValid)

// return cargoMap.size, render on size change
export const useCargoMapSize = () => CargoStore((state) => state.cargoMap.size)
export const useConfigName = () => CargoStore((state) => state.config.name)
// return cargoMap.get(uuid) as CargoString, re render on cargo quality change.
export const useCargo = (uuid:string) => CargoStore(s => s.cargoMap.get(uuid), (s1,s2) => isEqual(s1,s2)) as CargoString
export const useCargos = () => CargoStore(s => Array.from(s.cargoMap.values()), (s1,s2) => isEqual(s1,s2))

export const useValidation = () => CargoStore(s => isCargoValid(s))

export const getCargoValidMap = () => CargoStore.getState().cargoValidMap
export const getCargoMap = () => CargoStore.getState().cargoMap
export const getCargoAtUuid = (uuid:string) => CargoStore.getState().cargoMap.get(uuid) as CargoString
export const getConfig = () => CargoStore.getState().config

export const getActionsCS = () => {
  const state = CargoStore.getState()
  return {
    setConfig: state.putConfig,
    putConfigUuids: state.putConfigUuids,
    putCargos: state.putCargos,
    //putCargosIsValid: state.putCargosIsValid,
    //deleteCargosIsValid: state.deleteCargosIsValid,
    deleteCargos: state.deleteCargos,
    resetCargoStore: state.resetCargoStore,
  }
}
