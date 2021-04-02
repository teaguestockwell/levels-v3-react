import create, {State} from 'zustand'
import {CargoString} from '../types/cargoString'
export interface CargoStoreState extends State {
  putCargo: (cargo: CargoString) => void
  deleteCargo: (cargoId: number) => void
  deleteCargoIsValid: (cargoId: number) => void
  putCargoIsValid: (valid: boolean, cargoId: number) => void
  cargoValidMap: Map<number, boolean>
  cargoMap: Map<number, CargoString>
  resetCargoStore: () => void
}

export const CargoStore = create<CargoStoreState>((set) => ({
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
  resetCargoStore: () =>
    set((state) => {
      state.cargoMap.clear()
      state.cargoValidMap.clear()
    }),
}))
