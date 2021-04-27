import { Const } from '../const'

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


export const getSchemaOfEP = (ep:string) => {
  switch (ep) {
    case 'cargo': return {
      name: Const.schema.stringSchema,
      weight: Const.schema.numSchema,
      fs: Const.schema.numSchema,
      category: Const.schema.categorySchema
    }

    case 'config': return {
      name: Const.schema.stringSchema,
    }

    case 'configCargo': return {
      fs: Const.schema.numSchema,
      qty: Const.schema.intPositiveSchema
    }

    case 'glossary': return {
      name: Const.schema.stringSchema,
      body: Const.schema.stringSchema
    }

    case 'tank': return {
      name: Const.schema.stringSchema,
      weightsCSV: Const.schema.stringSchema,
      simpleMomsCSV: Const.schema.stringSchema,
    }

    default: {throw new Error(`invalid ep => getSchemaOfEP(${ep})`)}
  }
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
