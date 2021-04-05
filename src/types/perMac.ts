import { CargoString} from "./cargoString"

export interface PerMac {
  /** used to build rows of all cargo */
  items: CargoString[]
  totSimpleMom: string
  totUnSimpMom: string
  totWeight: string
  simpleMom: string
  balArm: string
  lemac: string
  mac: string
  perMacDecimal: string
  perMacPercent: string
  grandTotQty: string
  momMultiplier: string
}