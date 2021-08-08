import { CargoCalculated, CargoString } from ".";

export interface PercentMac {
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

