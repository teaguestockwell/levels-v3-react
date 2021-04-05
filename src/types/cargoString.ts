import {Category} from './aircraftDeep'

/** string representation of a cargo configured by user that is possibly invalid */
export interface CargoString {
  uuid: string
  name: string
  weight: string
  fs: string
  qty: string
  category: Category
}