import create, {State} from 'zustand'
import {Cargo} from '../types/cargo'
interface IStore extends State {
  putCargo: (cargo: Cargo) => void
  deleteCargo: (id: string) => void
  cargosMap: Map<string, Cargo>
}

export const CargoStore = create<IStore>((set) => ({
  cargosMap: new Map(),
  deleteCargo: (id) =>
    set((state) => {
      const newMap = state.cargosMap
      newMap.delete(id)
      return {cargosMap: newMap}
    }),
  putCargo: (cargo) =>
    set((state) => {
      state.cargosMap.set(cargo.cargoId, cargo)
    }),
}))
