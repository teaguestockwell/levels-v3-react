import create, {State} from 'zustand'
import {CargoString} from '../types/cargoString'
export interface CargoStoreState extends State {
  // create | update 1
  putCargo: (cargo: CargoString) => void
  putCargoIsValid: (valid: boolean, cargoId:number) => void

  // create | update n
  putCargos: (cargos : CargoString[]) => void
  putCargosIsValid: (cargoIdValidMap: Map<number,boolean>) => void

  // read 1 | n
  cargoValidMap: Map<number, boolean>
  cargoMap: Map<number, CargoString>

  // delete 1
  deleteCargo: (cargoId: number) => void
  deleteCargoIsValid: (cargoId: number) => void

  // delete n
  deleteCargos: (cargoIds: number[]) => void
  deleteCargosIsValid: (cargoIds: number[]) => void

  resetCargoStore: () => void
}

export const CargoStore = create<CargoStoreState>((set) => ({
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
      state.cargoMap.set(cargo.cargoId, cargo)
    }),
  putCargos: (cargos) => 
    set((state) => {
      cargos.forEach(c => state.cargoMap.set(c.cargoId, c))
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
