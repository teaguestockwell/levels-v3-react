import { Cargo } from ".";

export interface ConfigCargo {
  configId: number
  aircraftId: number
  cargoId: number
  configCargoId: number
  fs: number
  qty: number
  cargo: Cargo
}