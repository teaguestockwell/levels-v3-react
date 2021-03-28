import create, {State} from 'zustand'
import {ICargo} from '../types/ICargo'
interface IStore extends State {
  putCargo: (cargo: ICargo) => void
  deleteCargo: (id: string) => void
  cargosMap: Map<string, ICargo>
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
      state.cargosMap.set(cargo.id, cargo)
    }),
}))
