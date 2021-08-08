import { DataState } from "../..";

export interface AircraftClientServerSync {
  isClientSyncedWithServer: boolean
  serverEpoch: number
  dataState: DataState
}