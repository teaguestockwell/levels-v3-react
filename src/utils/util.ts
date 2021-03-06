import {Const} from './const'
import * as yup from 'yup'
import {v4} from 'uuid'
import {debounce} from 'lodash'
import queryString from 'query-string'
import {message} from 'antd'
import  * as Types from '../types'

export const getYupModelSchemas = (): {[key: string]: any} => {
  return {
    aircraft: {
      name: Const.schema.stringSchema,
      fs0: Const.schema.numSchema,
      fs1: Const.schema.numSchema,
      mom0: Const.schema.numSchema,
      mom1: Const.schema.numSchema,
      weight0: Const.schema.numSchema,
      weight1: Const.schema.numSchema,
      cargoWeight1: Const.schema.numSchema,
      lemac: Const.schema.numSchema,
      mac: Const.schema.numSchema,
      momMultiplyer: Const.schema.numSchema,
      shallowObj: yup.object().shape({
        name: Const.schema.stringSchema,
        fs0: Const.schema.numSchema,
        fs1: Const.schema.numSchema,
        mom0: Const.schema.numSchema,
        mom1: Const.schema.numSchema,
        weight0: Const.schema.numSchema,
        weight1: Const.schema.numSchema,
        cargoWeight1: Const.schema.numSchema,
        lemac: Const.schema.numSchema,
        mac: Const.schema.numSchema,
        momMultiplyer: Const.schema.numSchema,
      }),
    },
    cargo: {
      name: Const.schema.stringSchema,
      weight: Const.schema.numSchema,
      fs: Const.schema.numSchema,
      category: Const.schema.categorySchema,
      shallowObj: yup.object().shape({
        name: Const.schema.stringSchema,
        weight: Const.schema.numSchema,
        fs: Const.schema.numSchema,
        category: Const.schema.categorySchema,
      }),
    },

    config: {
      name: Const.schema.stringSchema,
      shallowObj: yup.object().shape({
        name: Const.schema.stringSchema,
      }),
    },

    configCargo: {
      fs: Const.schema.numSchema,
      qty: Const.schema.intPositiveSchema,
      shallowObj: yup.object().shape({
        fs: Const.schema.numSchema,
        qty: Const.schema.intPositiveSchema,
      }),
    },

    glossary: {
      name: Const.schema.stringSchema,
      body: Const.schema.stringSchema,
      shallowObj: yup.object().shape({
        name: Const.schema.stringSchema,
        body: Const.schema.stringSchema,
      }),
    },

    tank: {
      name: Const.schema.stringSchema,
      weightsCSV: Const.schema.numCSV,
      simpleMomsCSV: Const.schema.numCSV,
      shallowObj: yup.object().shape({
        name: Const.schema.stringSchema,
        weightsCSV: Const.schema.stringSchema,
        simpleMomsCSV: Const.schema.stringSchema,
      }),
    },

    user: {
      name: yup.string().required().email().max(50),
      role: Const.schema.intSchema,
      shallowObj: yup.object().shape({
        name: yup.string().required().email().max(50),
        role: Const.schema.intSchema,
      }),
    },
  }
}

/** if string is > max length cut it and add ... */
export const cut = (x: any): string => {
  return x.toString().length > Const.MAX_FORM_LENGTH
    ? x.toString().substring(0, Const.MAX_FORM_LENGTH - 3) + '...'
    : x.toString()
}
const getLeading0 = (num: number): string => {
  const str = num.toString()
  return str.length === 2 ? str : `0${str}`
}

export const formatDate = (date: Date) => {
  const year = date.getUTCFullYear()
  const month = getLeading0(date.getUTCMonth() + 1) // who made this zero based? nerd
  const day = getLeading0(date.getUTCDate())
  const hour = getLeading0(date.getUTCHours())
  const min = getLeading0(date.getUTCMinutes())
  return `${year}/${month}/${day} ${hour}:${min} Z`
}

export const getUTCDate = (date: Date) => {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  )
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

export const getCargoSchema = (air: Types.AircraftDeep): CargoSchema => {
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

export const getChartCSchema = (air: Types.AircraftDeep) => {
  const getMom = () =>
    yup
      .number()
      .typeError('this must be a number')
      .required()
      .positive()
      .max(air.mom1)
      .min(air.mom0)

  const getWeight = () =>
    yup
      .number()
      .typeError('this must be a number')
      .required()
      .positive()
      .max(air.weight1)
      .min(air.weight0)

  return {
    fullObjSchema: yup.object().shape({
      mom: getMom(),
      weight: getWeight(),
    }),
    mom: getMom(),
    weight: getWeight(),
  }
}

export const rulesYupWrapper = (fieldSchema: any): any[] => {
  return [
    {
      validator: debounce((rule: any, value: any, callback: any) => {
        fieldSchema
          .validate(value)
          .then(() => callback())
          .catch((e: any) => callback(e))
      }, 200),
    },
  ]
}

export const getCargoStringFromCargo = (
  cargo: Types.Cargo,
  qty: number
): Types.CargoString => {
  return {
    uuid: v4(),
    name: cargo.name,
    weightEA: cargo.weight.toString(),
    fs: cargo.fs.toString(),
    qty: qty.toString(),
    category: Types.CargoCategory.User,
    isValid: false,
  }
}

export const getCargoStringsFromConfig = (config: Types.Config): Types.CargoString[] => {
  return config.configCargos.map((cc) => ({
    uuid: v4(),
    name: cc.cargo.name,
    weightEA: cc.cargo.weight.toString(),
    fs: cc.fs.toString(),
    qty: cc.qty.toString(),
    category: cc.cargo.category,
    isValid: false,
  }))
}
export const getCargoString = (): Types.CargoString => {
  return {
    uuid: v4(),
    name: `custom cargo`,
    weightEA: '',
    fs: '',
    qty: '1',
    category: Types.CargoCategory.User,
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

export const getCargoStringFromTank2 = (props: {
  momMultiplyer: number
  simpleMom: number,
  weightEA: number,
  tankName: string
}): Types.CargoString => {

  const fs = getFSofSimpleMoment({
    simpleMom: props.simpleMom,
    weightEA: props.weightEA,
    momMultiplier: props.momMultiplyer,
    qty: 1,
  })
  return {
    uuid: v4(),
    name: props.tankName,
    weightEA: props.weightEA.toString(),
    fs: fs.toString(),
    qty: '1',
    category: Types.CargoCategory.Tank,
    isValid: true,
  }
}

export const getCargoStringFromTank = (props: {
  momMultiplyer: number
  idx: number
  tank: Types.Tank
}): Types.CargoString => {
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
    category: Types.CargoCategory.Tank,
    isValid: true,
  }
}

export const getCargoStringFromChartC = (
  momMultiplier: number,
  chartC: Types.ChartcCargoString,
  uuid: string
): Types.CargoString => {
  let fs: string

  if (!chartC.isValid) {
    fs = '0'
  } else {
    fs = getFSofSimpleMoment({
      simpleMom: Number(chartC.mom),
      weightEA: Number(chartC.weight),
      momMultiplier,
      qty: 1,
    }).toString()
  }

  return {
    uuid,
    name: 'Basic Aircraft',
    weightEA: chartC.weight,
    fs,
    qty: '1',
    category: Types.CargoCategory.BasicAircraft,
    isValid: chartC.isValid,
  }
}

export const getCargoStringsFromAirTanks = (air: Types.AircraftDeep) =>
  air.tanks.map((t) =>
    getCargoStringFromTank({
      momMultiplyer: air.momMultiplyer,
      tank: t,
      idx: 0,
    })
  )

export const getPerMac = (
  air: Types.AircraftDeep,
  cargoStrings: Types.CargoString[]
): Types.PercentMac => {
  let weightTotalAccum = 0
  let momentTotalAccum = 0
  let qtyAccum = 0

  const items = cargoStrings.map<Types.CargoString & Types.CargoCalculated>((c) => {
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

export const getQueryString = (obj: any) =>
  Object.keys(obj)
    .filter((k) => k.includes('Id'))
    .map((k) => `${k}=${obj[k]}`)
    .join('&')

/* given a models name, look at the yup schema an return list keys that an admin may edit for that model
 *
 **/
export const getEditableKeysOfModel = (model: string): string[] => {
  return Object.keys(getYupModelSchemas()[model])
    .filter((k: any) => k !== 'shallowObj')
    .sort((a: any, b: any) => a.localeCompare(b))
}

export const getModelFromEP = (ep: string): string => {
  return ep.includes('?') ? ep.split('?')[0] : ep
}

export const getParamsFromEp = (ep: string): string | null => {
  return ep.includes('?') ? ep.split('?')[1] : null
}

/**
 @param ep the full endpoint after the base url ex: config?aircraft=1
 @returns a new model with the correct pks and fks based on the context of the ep ex: 
{
  configId: 0,
  aircraftId: 2,
  name: "create"
}
 */
export const getNewModelFromEP = (ep: string): Record<string, any> => {
  const params = getParamsFromEp(ep)
  const model = getModelFromEP(ep)

  // use the url params to make obj
  const idModel = params ? queryString.parse(params, {parseNumbers: true}) : {}

  const baseModelKeys = Object.keys(getYupModelSchemas()[model]).filter(
    (k) => k !== 'shallowObj'
  )

  const baseModelObj: {[key: string]: unknown} = {}
  for (const k of baseModelKeys) {
    baseModelObj[k] = ''
  }

  return {
    ...baseModelObj,
    ...idModel,
    ...{[`${model}Id`]: 0},
  }
}

export const sanitizeNewAirEP = (oldEp: string, newId: number) => {
  if (!oldEp.includes('?')) {
    return oldEp
  }

  if (oldEp.includes('configCargo')) {
    return `config?aircraftId=${newId}`
  }

  return `${getModelFromEP(oldEp)}?aircraftId=${newId}`
}

export const removeNestedObj = (
  obj: Record<string, any>
): Record<string, any> => {
  const filterKeys = []

  for (const k in obj) {
    if (typeof obj[k] !== 'object') {
      filterKeys.push(k)
    }
  }

  const filteredObj: {[key: string]: any} = {}
  filterKeys.forEach((k) => (filteredObj[k] = obj[k]))

  return filteredObj
}

export const getQueryObjFromEP = (ep: string): Record<string, any> => {
  const model = getModelFromEP(ep)
  const params = getParamsFromEp(ep) ?? ''
  const queryObj = queryString.parse(params, {parseNumbers: true})
  return {...queryObj, model}
}

export const validateIsTanksCSVSameLen = (obj: any) => {
  try {
    // is this a tank?
    if (!obj.weightsCSV) {
      return true
    }

    const weightLen = obj.weightsCSV.split(',').length
    const momLen = obj.simpleMomsCSV.split(',').length

    if (weightLen === momLen) {
      return true
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}
  message.error({
    content: `Weight and moment must have the same length`,
    key: 'k',
    duration: 3,
  })
  return false
}
