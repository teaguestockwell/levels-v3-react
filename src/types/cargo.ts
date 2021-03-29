export enum CargoCategory {
  Steward,
  Emergency,
  Extra,
}
/** shape inde the api */
export interface Cargo {
  cargoId: string
  name: string
  weight: number
  fs: number
  qty: number
  category: CargoCategory
}
/** shape inside of a form where every field in a string */
export interface CargoString {
  cargoId: string
  name: string
  weight: string
  fs: string
  qty: string
}

