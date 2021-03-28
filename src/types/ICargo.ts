export enum CargoCategory {
  Steward,
  Emergency,
  Extra,
}
/** shape inde the api */
export interface ICargo {
  id: string
  name: string
  weight: number
  fs: number
  qty: number
  category: CargoCategory
}
/** shape inside of a form where every field in a string */
export interface ICargoString {
  name: string
  weight: string
  fs: string
  qty: string
}
