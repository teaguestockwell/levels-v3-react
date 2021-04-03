import create, {State} from 'zustand'
import { Const } from '../const'
import { Config } from '../types/aircraftDeep'
import {CargoString} from '../types/cargoString'
export interface CargoStoreState extends State {
  // create | update 1
  putCargo: (cargo: CargoString) => void
  putCargoIsValid: (valid: boolean, uuid:string) => void
  putConfig: (config: Config) => void
  putConfigUuids: (uuids: string[]) => void

  // create | update n
  putCargos: (cargos : CargoString[]) => void
  putCargosIsValid: (cargoIdValidMap: Map<string,boolean>) => void

  // read 1 | n
  cargoValidMap: Map<string, boolean>
  cargoMap: Map<string, CargoString>
  config: Config
  configUuids : string[]

  // delete 1
  deleteCargo: (cargoId: string) => void
  deleteCargoIsValid: (cargoId: string) => void

  // delete n
  deleteCargos: (cargoIds: string[]) => void
  deleteCargosIsValid: (cargoIds: string[]) => void

  resetCargoStore: () => void
}

export const CargoStore = create<CargoStoreState>((set) => ({
  config: Const.noConfig,
  configUuids: [],
  putConfigUuids: (uuids) => set((state) => {state.configUuids =uuids}),
  putConfig: (config) => set((state)=> {state.config = config}),
  putCargosIsValid: (cargoIdValidMap) => 
    set((state) => {
      Array.from(cargoIdValidMap.entries())
      .forEach(entry => state.cargoValidMap.set(entry[0],entry[1]))
    }),
  deleteCargosIsValid: (cargoIds) =>
    set((state) => {
      cargoIds.forEach(id => state.cargoValidMap.delete(id))
    }),
  cargoValidMap: new Map(),
  putCargoIsValid: (valid, cargoId) =>
    set((state) => {
      state.cargoValidMap.set(cargoId, valid)
    }),
  deleteCargoIsValid: (cargoId) =>
    set((state) => {
      state.cargoValidMap.delete(cargoId)
    }),
  cargoMap: new Map(),
  deleteCargo: (cargoId) =>
    set((state) => {
      state.cargoMap.delete(cargoId)
    }),
  putCargo: (cargo) =>
    set((state) => {
      state.cargoMap.set(cargo.uuid, cargo)
    }),
  putCargos: (cargos) => 
    set((state) => {
      cargos.forEach(c => state.cargoMap.set(c.uuid, c))
    }),
  deleteCargos: (cargoIds) => 
    set((state) => {  
      cargoIds.forEach(id => state.cargoMap.delete(id))
    }),
  resetCargoStore: () =>
    set((state) => {
      state.cargoMap.clear()
      state.cargoValidMap.clear()
    }),
}))
