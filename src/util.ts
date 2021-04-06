import {Const} from './const'
import * as yup from 'yup'
import {AircraftDeep, Cargo, Category, Config} from './types/aircraftDeep'
import {CargoString} from './types/cargoString'
import {v4} from 'uuid'
import {RequiredStringSchema} from 'yup/lib/string'
import {RequiredNumberSchema} from 'yup/lib/number'
import { CargoCalculated, PerMac } from './types/perMac'
/** if string is > max length cut it and add ... */
export const cut = (x: any): string => {
  return x.toString().length > Const.MAX_FORM_LENGTH
    ? x.toString().substring(0, Const.MAX_FORM_LENGTH - 3) + '...'
    : x.toString()
}
export const formatDate = (date: Date) => {
  const get2SignificantDigits = (num: number): string => {
    return num.toString().length === 2 ? num.toString() : '0' + num.toString()
  }

  const year = date.getUTCFullYear()
  const month = get2SignificantDigits(date.getUTCMonth() + 1) // who made this zero based? nerd
  const day = get2SignificantDigits(date.getUTCDate())
  const hour = get2SignificantDigits(date.getUTCHours())
  const min = get2SignificantDigits(date.getUTCMinutes())
  return `${year}-${month}-${day} ${hour}:${min} Zulu`
}

export interface CargoSchema {
  name: RequiredStringSchema<string | undefined, Record<string, any>>
  weight: RequiredNumberSchema<number | undefined, Record<string, any>>
  fs: RequiredNumberSchema<number | undefined, Record<string, any>>
  qty: RequiredNumberSchema<number | undefined, Record<string, any>>
  fullObjSchema: any
}

export const getCargoSchema = (air: AircraftDeep): CargoSchema => {
  const getNameSchema = () => yup.string().required()
  const getWeightSchema = () =>
    yup
      .number()
      .typeError('this must be a number')
      .required()
      .positive()
      .max(air.cargoWeight1)
  const getFsSchema = () =>
    yup
      .number()
      .typeError('this must be a number')
      .required()
      .positive()
      .min(air.fs0)
      .max(air.fs1)
  const getQtySchema = () =>
    yup
      .number()
      .typeError('this must be an integer')
      .required()
      .positive()
      .integer()

  return {
    name: getNameSchema(),
    weight: getWeightSchema(),
    fs: getFsSchema(),
    qty: getQtySchema(),
    fullObjSchema: yup.object().shape({
      name: getNameSchema(),
      weight: getWeightSchema(),
      fs: getFsSchema(),
      qty: getQtySchema(),
    }),
  }
}

export const cargoToNewCargoString = (
  cargo: Cargo,
  qty: number
): CargoString => {
  return {
    uuid: v4(),
    name: cargo.name,
    weightEach: cargo.weight.toString(),
    fs: cargo.fs.toString(),
    qty: qty.toString(),
    category: Category.User,
  }
}

export const configToNewCargoStrings = (config: Config): CargoString[] => {
  return config.configCargos.map((cc) => ({
    uuid: v4(),
    name: cc.cargo.name,
    weightEach: cc.cargo.weight.toString(),
    fs: cc.fs.toString(),
    qty: cc.qty.toString(),
    category: cc.cargo.category,
  }))
}
export const getNewCustomCargoString = (): CargoString => {
  return {
    uuid: v4(),
    name: `custom cargo`,
    weightEach: '',
    fs: '',
    qty: '1',
    category: Category.User,
  }
}
export const capitalizeFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const getPerMac = (air: AircraftDeep, cargoStrings: CargoString[]):PerMac => {
  let weightTotalAccum = 0
  let momentTotalAccum = 0
  let qtyAccum = 0

  const items = cargoStrings.map<CargoString & CargoCalculated>(c => {
    const fs = Number(c.fs)
    const qty = Number(c.qty)
    const weightEach = Number(c.weightEach)

    const momentEach = fs * weightEach
    const simpleMomentEach = momentEach / air.momMultiplyer

    const weightTotal = weightEach * qty
    const momentTotal = momentEach * qty
    const simpleMomentTotal = momentTotal / air.momMultiplyer
    

    weightTotalAccum += weightTotal
    qtyAccum += qty
    momentTotalAccum += momentTotal

    return{
      // CargoString
      uuid: c.uuid,
      name: cut(c.name),
      weightEach: Number(c.weightEach).toFixed(Const.PERMAC_DECIMAL),
      fs: c.fs,
      qty: c.qty,
      category: c.category,

      // CargoCalculated
      momentEach: momentEach.toFixed(Const.PERMAC_DECIMAL),
      simpleMomentEach: simpleMomentEach.toFixed(Const.PERMAC_DECIMAL),
      weightTotal: weightTotal.toFixed(Const.PERMAC_DECIMAL),
      momentTotal: momentTotal.toFixed(Const.PERMAC_DECIMAL),
      simpleMomentTotal: simpleMomentTotal.toFixed(Const.PERMAC_DECIMAL)
    }
  })

  const balArm = momentTotalAccum / weightTotalAccum
  const percentMacDecimal = (balArm - air.lemac) / air.mac

  const simpleMomentGrandTotal = momentTotalAccum / air.momMultiplyer
  const percentMacPercent = (percentMacDecimal * 100).toFixed(Const.PERMAC_DECIMAL) + '%'

  return {
    items,
    qtyGrandTotal: qtyAccum.toFixed(Const.PERMAC_DECIMAL),
    momentMultiplier: air.momMultiplyer.toFixed(Const.PERMAC_DECIMAL),
    mac: air.mac.toFixed(Const.PERMAC_DECIMAL),
    lemac: air.lemac.toFixed(Const.PERMAC_DECIMAL),
    balArm: balArm.toFixed(Const.PERMAC_DECIMAL),
    momentGrandTotal: momentTotalAccum.toFixed(Const.PERMAC_DECIMAL),
    simpleMomentGrandTotal: simpleMomentGrandTotal.toFixed(Const.PERMAC_DECIMAL),
    weightGrandTotal: weightTotalAccum.toFixed(Const.PERMAC_DECIMAL),
    percentMacDecimal: percentMacDecimal.toFixed(Const.PERMAC_DECIMAL),
    percentMacPercent,
  }
}