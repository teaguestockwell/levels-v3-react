import { DataState } from "../..";

export interface EpAircraftClientServerSync {
  isClientSyncedWithServer: boolean
  serverEpoch: number
  dataState: DataState
}