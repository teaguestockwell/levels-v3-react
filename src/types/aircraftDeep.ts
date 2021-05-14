import {Const} from '../utils/const'
import * as yup from 'yup'

export enum Category {
  Emergency = 'Emergency',
  Extra = 'Extra',
  Steward = 'Steward',
  User = 'User',
  Tank = 'Tank',
  BasicAircraft = 'BasicAircraft',
}
export interface AircraftDeep {
  aircraftId: number
  name: string
  fs0: number
  fs1: number
  mom0: number
  mom1: number
  weight0: number
  weight1: number
  cargoWeight1: number
  lemac: number
  mac: number
  momMultiplyer: number
  cargos: Cargo[]
  tanks: Tank[]
  glossarys: Glossary[]
  configs: Config[]
}
export interface Cargo {
  aircraftId: number
  cargoId: number
  updated: Date
  updatedBy: string

  name: string
  weight: number
  fs: number
  category: Category
}
export interface Config {
  aircraftId: number
  configId: number
  name: string
  configCargos: ConfigCargo[]
}

export interface ConfigCargo {
  configId: number
  aircraftId: number
  cargoId: number
  configCargoId: number
  fs: number
  qty: number
  cargo: Cargo
}

export interface Glossary {
  aircraftId: number
  glossaryId: number
  name: string
  body: string
}

export interface Tank {
  name: string
  aircraftId: number
  tankId: number
  weightsCSV: string
  simpleMomsCSV: string
}

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
      weightsCSV: Const.schema.stringSchema,
      simpleMomsCSV: Const.schema.stringSchema,
      shallowObj: yup.object().shape({
        name: Const.schema.stringSchema,
        weightsCSV: Const.schema.stringSchema,
        simpleMomsCSV: Const.schema.stringSchema,
      }),
    },

    user: {
      name: Const.schema.stringSchema,
      role: Const.schema.intSchema,
      shallowObj: yup.object().shape({
        name: Const.schema.stringSchema,
        role: Const.schema.intSchema,
      }),
    },
  }
}
