import create, {State} from 'zustand'
import {Const} from '../utils/const'
import {Config} from '../types/aircraftDeep'
import {CargoString} from '../types/cargoString'
import isEqual from 'lodash/isEqual'
export interface CargoStoreState extends State {
  // read
  pageName: string
  cargoMap: Map<string, CargoString>
  config: Config
  editUuid: string | undefined
  chartC: {weight: string; mom: string}

  putPageName: (pageName: string) => void

  putChartC: (chartC: {weight: string; mom: string}) => void

  // update 1 config
  putConfig: (config: Config) => void

  // update 1 editing state
  putEditUuid: (uuid: string | undefined) => void

  // create | update n cargo
  putCargos: (cargos: CargoString[]) => void

  // delete n
  deleteCargos: (cargoIds: string[]) => void
  // when a new air is selected, reset all state
  resetCargoStore: () => void
}

export const CargoStore = create<CargoStoreState>((set) => ({

  // read
  pageName: '%MAC',
  cargoValidMap: new Map(),
  cargoMap: new Map(),
  config: Const.NO_CONFIG,
  configUuids: [],
  editUuid: undefined,
  chartC: {weight: '', mom: ''},

  putPageName: (pageName) => set(s => {s.pageName = pageName}),

  putChartC: (chartC) =>
    set((s) => {
      s.chartC = chartC
    }),

  // update 1
  putEditUuid: (uuid) =>
    set((s) => {
      s.editUuid = uuid
    }),

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
      state.chartC = {weight: '', mom: ''}
    }),
}))

const isCargoValid = (s: CargoStoreState) =>
  Array.from(s.cargoMap.values()).every((c) => c.isValid)

// return cargoMap.size, render on size change
export const useCargoMapSize = () => CargoStore((state) => state.cargoMap.size)
export const useConfigName = () => CargoStore((state) => state.config.name)
// return cargoMap.get(uuid) as CargoString, re render on cargo quality change.
export const useCargo = (uuid: string) =>
  CargoStore(
    (s) => s.cargoMap.get(uuid),
    (s1, s2) => isEqual(s1, s2)
  ) as CargoString
export const useCargos = () =>
  CargoStore(
    (s) => Array.from(s.cargoMap.values()),
    (s1, s2) => isEqual(s1, s2)
  )

export const useValidation = () => CargoStore((s) => isCargoValid(s))

export const getCargoValidMap = () => CargoStore.getState().cargoValidMap
export const getCargoMap = () => CargoStore.getState().cargoMap
export const getCargoAtUuid = (uuid: string) =>
  CargoStore.getState().cargoMap.get(uuid) as CargoString
export const getConfig = () => CargoStore.getState().config

export const usePageName = () => CargoStore(s => s.pageName)

export const getActionsCS = () => {
  const state = CargoStore.getState()
  return {
    putPageName: state.putPageName,
    putBasicWeight: state.putBasicWeight,
    putBasicMom: state.putBasicMom,
    putEditUuid: state.putEditUuid,
    putConfig: state.putConfig,
    putConfigUuids: state.putConfigUuids,
    putCargos: state.putCargos,
    putChartC: state.putChartC,
    deleteCargos: state.deleteCargos,
    resetCargoStore: state.resetCargoStore,
  }
}
