import { Cargo, Tank, Glossary, Config } from ".";

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
