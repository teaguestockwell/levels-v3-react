import {Const} from './const'
import * as yup from 'yup'
import {AircraftDeep, Cargo, Category, Config, Tank} from './types/aircraftDeep'
import {CargoString} from './types/cargoString'
import {v4} from 'uuid'
import {CargoCalculated, PerMac} from './types/perMac'
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

export const capitalizeFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
export interface CargoSchema {
  name: any
  weightEA: any
  fs: any
  qty: any
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
    weightEA: getWeightSchema(),
    fs: getFsSchema(),
    qty: getQtySchema(),
    fullObjSchema: yup.object().shape({
      name: getNameSchema(),
      weightEA: getWeightSchema(),
      fs: getFsSchema(),
      qty: getQtySchema(),
    }),
  }
}

export const getCargoStringFromCargo = (
  cargo: Cargo,
  qty: number
): CargoString => {
  return {
    uuid: v4(),
    name: cargo.name,
    weightEA: cargo.weight.toString(),
    fs: cargo.fs.toString(),
    qty: qty.toString(),
    category: Category.User,
    isValid: false,
  }
}

export const getCargoStringsFromConfig = (config: Config): CargoString[] => {
  return config.configCargos.map((cc) => ({
    uuid: v4(),
    name: cc.cargo.name,
    weightEA: cc.cargo.weight.toString(),
    fs: cc.fs.toString(),
    qty: cc.qty.toString(),
    category: cc.cargo.category,
    isValid: false,
    isOpen: false
  }))
}
export const getCargoString = (): CargoString => {
  return {
    uuid: v4(),
    name: `custom cargo`,
    weightEA: '',
    fs: '',
    qty: '1',
    category: Category.User,
    isValid: false,
  }
}

export const getFSofSimpleMoment = (props: {
  simpleMom: number
  momMultiplier: number
  weightEA: number
  qty: number
}) => {
  return (props.simpleMom * props.momMultiplier) / (props.weightEA * props.qty)
}

export const getCargoStringFromTank = (props: {
  momMultiplyer: number
  idx: number
  tank: Tank
}): CargoString => {
  const simpleMom = Number(props.tank.simpleMomsCSV.split(',')[props.idx])
  const weightEA = Number(props.tank.weightsCSV.split(',')[props.idx])
  const fs = getFSofSimpleMoment({
    simpleMom,
    weightEA,
    momMultiplier: props.momMultiplyer,
    qty: 1,
  })
  return {
    uuid: v4(),
    name: props.tank.name,
    weightEA: weightEA.toString(),
    fs: fs.toString(),
    qty: '1',
    category: Category.Tank,
    isValid: true,
  }
}

export const getCargoStringsFromAirTanks = (air: AircraftDeep) =>
  air.tanks.map((t) =>
    getCargoStringFromTank({
      momMultiplyer: air.momMultiplyer,
      tank: t,
      idx: 0,
    })
  )

export const getPerMac = (
  air: AircraftDeep,
  cargoStrings: CargoString[]
): PerMac => {
  let weightTotalAccum = 0
  let momentTotalAccum = 0
  let qtyAccum = 0

  const items = cargoStrings.map<CargoString & CargoCalculated>((c) => {
    const fs = Number(c.fs)
    const qty = Number(c.qty)
    const weightEach = Number(c.weightEA)

    const momentEach = fs * weightEach
    const simpleMomentEach = momentEach / air.momMultiplyer

    const weightTotal = weightEach * qty
    const momentTotal = momentEach * qty
    const simpleMomentTotal = momentTotal / air.momMultiplyer

    weightTotalAccum += weightTotal
    qtyAccum += qty
    momentTotalAccum += momentTotal

    return {
      // CargoString
      uuid: c.uuid,
      name: cut(c.name),
      weightEA: Number(c.weightEA).toFixed(Const.PERMAC_DECIMAL),
      fs: c.fs,
      qty: c.qty,
      category: c.category,
      isValid: c.isValid,

      // CargoCalculated
      momentEach: momentEach.toFixed(Const.PERMAC_DECIMAL),
      simpleMomentEach: simpleMomentEach.toFixed(Const.PERMAC_DECIMAL),
      weightTotal: weightTotal.toFixed(Const.PERMAC_DECIMAL),
      momentTotal: momentTotal.toFixed(Const.PERMAC_DECIMAL),
      simpleMomentTotal: simpleMomentTotal.toFixed(Const.PERMAC_DECIMAL),
    }
  })

  const balArm = momentTotalAccum / weightTotalAccum
  const percentMacDecimal = (balArm - air.lemac) / air.mac

  const simpleMomentGrandTotal = momentTotalAccum / air.momMultiplyer
  const percentMacPercent =
    (percentMacDecimal * 100).toFixed(Const.PERMAC_DECIMAL) + '%'

  return {
    qtyGrandTotal: qtyAccum.toFixed(Const.PERMAC_DECIMAL),
    momentMultiplier: air.momMultiplyer.toFixed(Const.PERMAC_DECIMAL),
    mac: air.mac.toFixed(Const.PERMAC_DECIMAL),
    lemac: air.lemac.toFixed(Const.PERMAC_DECIMAL),
    balArm: balArm.toFixed(Const.PERMAC_DECIMAL),
    momentGrandTotal: momentTotalAccum.toFixed(Const.PERMAC_DECIMAL),
    simpleMomentGrandTotal: simpleMomentGrandTotal.toFixed(
      Const.PERMAC_DECIMAL
    ),
    weightGrandTotal: weightTotalAccum.toFixed(Const.PERMAC_DECIMAL),
    percentMacDecimal: percentMacDecimal.toFixed(Const.PERMAC_DECIMAL + 2),
    percentMacPercent,
    items,
  }
}
