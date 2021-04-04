import create, {State} from 'zustand'
import { Const } from '../const'
import { Config } from '../types/aircraftDeep'
import {CargoString} from '../types/cargoString'
export interface CargoStoreState extends State {
  // read 
  cargoValidMap: Map<string, boolean>
  cargoMap: Map<string, CargoString>
  config: Config
  configUuids : string[]
  
  // update 1 config
  putConfig: (config: Config) => void
  putConfigUuids: (uuids: string[]) => void
  
  // create | update n cargo
  putCargos: (cargos : CargoString[]) => void
  putCargosIsValid: (cargoIdValidMap: Map<string,boolean>) => void
  
  // delete n
  deleteCargosIsValid: (cargoIds: string[]) => void
  deleteCargos: (cargoIds: string[]) => void
  // when a new air is selected, reset all state
  resetCargoStore: () => void
}

export const CargoStore = create<CargoStoreState>((set) => ({
  // read 
  cargoValidMap: new Map(),
  cargoMap: new Map(),
  config: Const.noConfig,
  configUuids: [],

  // update 1 config
  putConfig: (config) => set((state)=> {state.config = config}),
  putConfigUuids: (uuids) => set((state) => {state.configUuids =uuids}),
  
  // create | update n cargo
  putCargos: (cargos) => 
    set((state) => {
      cargos.forEach(c => state.cargoMap.set(c.uuid, c))
    }),
  putCargosIsValid: (cargoIdValidMap) => 
    set((state) => {
      Array.from(cargoIdValidMap.entries())
      .forEach(entry => state.cargoValidMap.set(entry[0],entry[1]))
    }),

  // delete n
  deleteCargosIsValid: (cargoIds) =>
  set((state) => {
    cargoIds.forEach(id => state.cargoValidMap.delete(id))
    }),
    deleteCargos: (cargoIds) => 
    set((state) => {  
      cargoIds.forEach(id => state.cargoMap.delete(id))
    }),
    // when a new air is selected, reset all state
    resetCargoStore: () =>
      set((state) => {
        state.cargoMap.clear()
        state.cargoValidMap.clear()
        state.config = Const.noConfig
      }),
  }))
