import {CargoString} from './cargoString'

export interface PerMac {
  /** used to build rows of all cargo */
  items: Array<CargoString & CargoCalculated>
  qtyGrandTotal: string
  momentMultiplier: string
  mac: string
  lemac: string
  balArm: string
  momentGrandTotal: string
  simpleMomentGrandTotal: string
  weightGrandTotal: string
  percentMacDecimal: string
  percentMacPercent: string
}

export interface CargoCalculated {
  momentEach: string
  simpleMomentEach: string
  weightTotal: string
  momentTotal: string
  simpleMomentTotal: string
}
