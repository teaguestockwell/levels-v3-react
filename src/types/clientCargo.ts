import {Category} from './aircraftDeep'

export interface ClientCargo {
  cargoId: string
  name: string
  weight: number
  fs: number
  qty: number
  category: Category
}

/** shape inside of a form where every field in a string */
export interface ClientCargoString {
  cargoId: string
  name: string
  weight: string
  fs: string
  qty: string
}