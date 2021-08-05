import create, {State} from 'zustand'
import {Const} from '../utils/const'
import {AircraftDeep, Config, Category} from '../types/aircraftDeep'
import {CargoString} from '../types/cargoString'
import isEqual from 'lodash/isEqual'
import {
  CargoSchema,
  getCargoSchema,
  getCargoStringsFromAirTanks,
} from '../utils/util'

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
  setPageName: (pageName: string) => void
  setChartC: (chartC: {weight: string; mom: string}) => void
  setConfig: (config: Config) => void
  setEditUuid: (uuid: string | undefined) => void

  // create | update n
  putCargos: (cargos: CargoString[]) => void

  // delete n
  deleteCargos: (cargoIds: string[]) => void

  // when a new air is selected, reset all state
  setAir: (air: AircraftDeep, resetCargo?: boolean) => void

  // testing only
  clearCargoMap: () => void
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
    set((s) => {
      s.config = config
    }),

  // create | update n
  putCargos: (cargos) =>
    set((s) => {
      cargos.forEach((c) => s.cargoMap.set(c.uuid, c))
    }),

  // delete n
  deleteCargos: (cargoIds) =>
    set((s) => {
      cargoIds.forEach((id) => s.cargoMap.delete(id))
    }),

  // testing only
  clearCargoMap: () =>
    set((s) => {
      s.cargoMap = new Map<string, CargoString>()
    }),

  // when a new air is selected, reset all state
  setAir: (air: AircraftDeep, resetCargo = true) => {
    const chartC: [string, CargoString] = [
      air.aircraftId.toString(),
      {
        name: 'Basic Aircraft',
        weightEA: '0',
        fs: '0',
        qty: '1',
        isValid: false,
        uuid: air.aircraftId.toString(),
        category: Category.BasicAircraft,
      },
    ]
    const tanks = getCargoStringsFromAirTanks(air).map<[string, CargoString]>(
      (cs) => [cs.uuid, cs]
    )

    return set((s) => {
      s.air = air
      // during tests, we need to setup cargo map state to test
      s.cargoMap = resetCargo
        ? new Map<string, CargoString>([chartC, ...tanks])
        : s.cargoMap
      s.config = Const.NO_CONFIG
      s.chartC = {weight: '', mom: ''}
      s.cargoSchema = getCargoSchema(air)
    })
  },
}))

export const getUserActions = () => {
  const s = userStore.getState()
  return {
    setPageName: s.setPageName,
    setEditUuid: s.setEditUuid,
    setConfig: s.setConfig,
    setChartC: s.setChartC,
    putCargos: s.putCargos,
    deleteCargos: s.deleteCargos,
    setAir: s.setAir,
  }
}

// hooks that subscribe components to derived state of the store
// anytime an action is used to update state,
// if state1.prop !== state2.prop subscriptions using custom hooks will re render
// because {foo: "bar"} !== {foo: "bar"} objects would be notified on every action
// to prevent this we pass in a custom equality function as the second argument
// isEqual({foo: "bar"},{foo: "bar"}) === true
export const usePageName = () => userStore((s) => s.pageName)

export const useCargoMapSize = () => userStore((s) => s.cargoMap.size)

export const useConfigName = () => userStore((s) => s.config.name)

export const useCargo = (uuid: string) => {
  return userStore(
    (s) => s.cargoMap.get(uuid),
    (s1, s2) => isEqual(s1, s2)
  ) as CargoString
}

export const useCargos = () => {
  return userStore(
    (s) => Array.from(s.cargoMap.values()),
    (s1, s2) => isEqual(s1, s2)
  )
}

export const useUserAir = () =>
  userStore(
    (s) => s.air,
    (s1, s2) => isEqual(s1, s2)
  )

// helper functions to access state
export const getUserCargo = (uuid: string) =>
  userStore.getState().cargoMap.get(uuid) as CargoString

export const getUserCargos = () =>
  Array.from(userStore.getState().cargoMap.values())

export const getUserAir = () => userStore.getState().air as AircraftDeep

export const getUserSchema = () =>
  userStore.getState().cargoSchema as CargoSchema
