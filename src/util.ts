import {Const} from './const'
import * as yup from 'yup'
import {AircraftDeep, Cargo, Category} from './types/aircraftDeep'
import {CargoString} from './types/cargoString'
/** if string is > max length cut it and add ... */
export const cut = (x: any): string => {
  return x.toString().length > Const.MAX_FORM_LENGTH
    ? x.toString().substring(0, Const.MAX_FORM_LENGTH - 3) + '...'
    : x.toString()
}
/** validate that value < x */
export const isLessThan = async (value: any, x: number) => {
  if (!value) {
  } // let other rules handle empty string case
  else if (value > x) {
    throw new Error()
  }
}
/** validate that value > x */
export const isGreaterThan = async (value: any, x: number) => {
  if (!value) {
  } // let other rules handle empty string case
  else if (value < x) {
    throw new Error()
  }
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
export const getYupSchema = (air: AircraftDeep) => {
  return yup.object().shape({
    name: yup.string().required(),
    weight: yup.number().required().positive().max(air.cargoWeight1),
    fs: yup.number().required().positive().min(air.fs0).max(air.fs1),
    qty: yup.number().required().positive().integer(),
  })
}
export const cargoToNewCustomCargo = (
  cargo: Cargo,
  qty: number
): CargoString => {
  return {
    cargoId: Date.now().valueOf(),
    name: cargo.name,
    weight: cargo.weight.toString(),
    fs: cargo.fs.toString(),
    qty: qty.toString(),
    category: Category.User,
  }
}
export const getNewCustomCargoString = (): CargoString => {
  return {
    cargoId: new Date().valueOf(),
    name: `custom cargo`,
    weight: '',
    fs: '',
    qty: '1',
    category: Category.User,
  }
}
