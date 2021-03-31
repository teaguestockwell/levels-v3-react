import create, {State} from 'zustand'
import {Cargo} from '../types/cargo'
export interface CargoStoreState extends State {
  putCargo: (cargo: Cargo) => void
  deleteCargo: (cargoId: string) => void
  deleteCargoIsValid: (cargoId: string) => void
  putCargoIsValid: (valid: boolean, cargoId: string) => void
  cargoValidMap: Map<string, boolean>
  cargoMap: Map<string, Cargo>
}

export const CargoStore = create<CargoStoreState>((set) => ({
  cargoValidMap: new Map(),
  putCargoIsValid: (valid, cargoId) =>
    set((state) => {
      state.cargoValidMap.set(cargoId, valid)
    }),
  deleteCargoIsValid: (cargoId: string) =>
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
}))
