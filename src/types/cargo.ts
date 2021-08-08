import { CargoCategory } from ".";

export interface Cargo {
  aircraftId: number
  cargoId: number
  updated: Date
  updatedBy: string

  name: string
  weight: number
  fs: number
  category: CargoCategory
}