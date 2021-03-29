import create, {State} from 'zustand'
import {Cargo} from '../types/cargo'
export interface CargoStoreState extends State {
  putCargo: (cargo: Cargo) => void
  deleteCargo: (id: string) => void
  putCargosIsValid: (valid: boolean, cargoId: string) => void
  cargosValidMap: Map<string,boolean>
  cargosMap: Map<string, Cargo>
}

export const CargoStore = create<CargoStoreState>((set) => ({
  cargosValidMap: new Map(),
  putCargosIsValid: (valid:boolean, cargoId:string) =>
    set((state) => {
      state.cargosValidMap.set(cargoId, valid)
    }),
  cargosMap: new Map(),
  deleteCargo: (id) =>
    set((state) => {
      state.cargosMap.delete(id)
    }),
  putCargo: (cargo) =>
    set((state) => {
      state.cargosMap.set(cargo.cargoId, cargo)
    }),
}))
