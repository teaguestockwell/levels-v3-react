import create, {State} from 'zustand'
import {ICargo} from '../types/ICargo'

interface IStore extends State {
  putCargo: (cargo: ICargo) => void
  deleteCargo: (id: string) => void
  cargos: ICargo[]
  cargoIds: string[]
}

export const CargoStore = create<IStore>(set => ({
  // state of each cargo obj
  cargos: [],
  // state of if a cargo id is added
  cargoIds: [],
  deleteCargo: (id) =>
    set((state) => {
      state.cargos = deleteCargoHandler(state.cargos, id)
      state.cargoIds = deleteCargoItemIdsHandler(state.cargoIds, id)
    }),
  putCargo: (cargo) =>
    set((state) => {
      state.cargos = putCargoHandler(state.cargos, cargo)
      state.cargoIds = putCargoIdsHandler(state.cargoIds, cargo.id)
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

function putCargoIdsHandler(oldIds: string[], newId:string):string[]{
  let replaced: boolean = false

  // replace old cargo if it exists
  oldIds.forEach((x, i) => {
    if (x === newId) {
      oldIds[i] = newId
      replaced = true
    }
  })

  // if old cargo was not replaced, add new cargo
  if (!replaced) {
    oldIds.push(newId)
  }

  return [...oldIds]
}

function deleteCargoHandler(cargos: ICargo[], id: string): ICargo[] {
  return cargos.filter(c => c.id !== id)
}

function deleteCargoItemIdsHandler(ids: string[], deleteId:string): string[]{
  return ids.filter(c => c !== deleteId)
}
