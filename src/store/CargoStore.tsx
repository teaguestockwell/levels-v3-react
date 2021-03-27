import create, {State} from 'zustand'
import {ICargo} from '../types/ICargo'

interface ICargoStore extends State {
  putCargo: (cargo: ICargo) => void
  deleteCargo: (id: string) => void
  cargos: ICargo[]
}

export const CargoStore = create<ICargoStore>((set) => ({
  cargos: [],
  deleteCargo: (id) =>
    set((state) => {
      state.cargos = deleteCargoHandler(state.cargos, id)
    }),
  putCargo: (cargo) =>
    set((state) => {
      state.cargos = putCargoHandler(state.cargos, cargo)
    }),
}))

function putCargoHandler(oldCargos: ICargo[], newCargo: ICargo): ICargo[] {
  let replaced: boolean = false

  // replace old cargo if it exists
  oldCargos.forEach((cargo, i) => {
    if (cargo.id === newCargo.id) {
      oldCargos[i] = newCargo
      replaced = true
    }
  })

  // if old cargo was not replaced, add new cargo
  if (!replaced) {
    oldCargos.push(newCargo)
  }

  return [...oldCargos]
}

function deleteCargoHandler(cargos: ICargo[], id: string): ICargo[] {
  return cargos.filter((c) => c.id !== id)
}
