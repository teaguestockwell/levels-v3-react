import create, {State} from 'zustand'
import {Const} from '../utils/const'
import {AircraftDeep, Config, Category} from '../types/aircraftDeep'
import {CargoString} from '../types/cargoString'
import isEqual from 'lodash/isEqual'
import { CargoSchema, getCargoSchema, getCargoStringsFromAirTanks } from '../utils/util'
import { v4 } from 'uuid'

export interface UserStoreState extends State {
  // read
  pageName: string
  cargoMap: Map<string, CargoString>
  config: Config
  editUuid: string | undefined
  chartC: {weight: string; mom: string}
  air: AircraftDeep | undefined
  cargoSchema: CargoSchema | undefined
  
  // update 1
  setCargoSchema: (cargoSchema: CargoSchema) => void
  setAir: (air: AircraftDeep) => void
  setPageName: (pageName: string) => void
  setChartC: (chartC: {weight: string; mom: string}) => void
  setConfig: (config: Config) => void
  setEditUuid: (uuid: string | undefined) => void

  // create | update n
  putCargos: (cargos: CargoString[]) => void

  // delete n
  deleteCargos: (cargoIds: string[]) => void

  // when a new air is selected, reset all state
  resetCargoStore: () => void
}

export const userStore = create<UserStoreState>((set) => ({
  // read
  pageName: '%MAC',
  cargoMap: new Map(),
  config: Const.NO_CONFIG,
  configUuids: [],
  editUuid: undefined,
  chartC: {weight: '', mom: ''},
  air: undefined,
  cargoSchema: undefined,

  // update 1
  setCargoSchema: (cargoSchema) =>
    set((state) => {
      state.cargoSchema = cargoSchema
    }),

  setAir: (air) => {
    set((state) => {
      state.air = air
    })
  },

  setPageName: (pageName) =>
    set((s) => {
      s.pageName = pageName
    }),

  setChartC: (chartC) =>
    set((s) => {
      s.chartC = chartC
    }),

  setEditUuid: (uuid) =>
    set((s) => {
      s.editUuid = uuid
    }),

  setConfig: (config) =>
    set((state) => {
      state.config = config
    }),

  // create | update n
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

export const getUserActions = () => {
  const state = userStore.getState()
  return {
    putPageName: state.setPageName,
    putEditUuid: state.setEditUuid,
    putConfig: state.setConfig,
    putCargos: state.putCargos,
    putChartC: state.setChartC,
    deleteCargos: state.deleteCargos,
    resetCargoStore: state.resetCargoStore,
    putCargoSchema: state.setCargoSchema,
    putSelectedAir: state.setAir,
  }
}

// hooks that subscribe components to derived state of the store

export const useCargoMapSize = () => userStore((state) => state.cargoMap.size)

export const useConfigName = () => userStore((state) => state.config.name)

export const useCargo = (uuid: string) => {
  return userStore(
    (s) => s.cargoMap.get(uuid),
    (s1, s2) => isEqual(s1, s2) // custom equality because {} !== {}, but isEqual({},{})
  ) as CargoString
}
  

export const useValidation = () => userStore((s) => Array.from(s.cargoMap.values()).every((c) => c.isValid))


export const getCargoAtUuid = (uuid: string) =>
  userStore.getState().cargoMap.get(uuid) as CargoString
export const getConfig = () => userStore.getState().config

export const usePageName = () => userStore((s) => s.pageName)
export const getAir = () => userStore.getState().air as AircraftDeep
export const getSchema = () => userStore.getState().cargoSchema as CargoSchema
export const useAirId = () => userStore((x) => x.air?.aircraftId)

export const initAirCargos = (air: AircraftDeep) => {
  const cs = getUserActions()

  cs.resetCargoStore()

  // set cargo validation schema to schema from new aircraft
  cs.putCargoSchema(getCargoSchema(air))

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
}

export const useUserAir = () =>
  userStore(
    (s) => s.air,
    (s1, s2) => isEqual(s1, s2)
  )


