import { AircraftDeep, DataState } from "../..";

export interface AircraftLastUpdated {
  serverEpoch: number
  dataState: DataState
  data: AircraftDeep[]
}
