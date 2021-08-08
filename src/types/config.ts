import { ConfigCargo } from ".";

export interface Config {
  aircraftId: number
  configId: number
  name: string
  configCargos: ConfigCargo[]
}