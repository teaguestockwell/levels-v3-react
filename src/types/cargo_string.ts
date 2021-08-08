import { CargoCategory } from ".";

/** string representation of a cargo configured by user that is possibly invalid */
export interface CargoString {
  uuid: string
  name: string
  weightEA: string
  fs: string
  qty: string
  category: CargoCategory
  isValid: boolean
}
