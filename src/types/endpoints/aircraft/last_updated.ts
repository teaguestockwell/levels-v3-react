import { AircraftDeep, DataState } from "../..";

export interface EpAircraftDeep {
  serverEpoch: number
  dataState: DataState
  data: AircraftDeep[]
}
