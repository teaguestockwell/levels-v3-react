import { AirStore } from "../hooks/airStore"
import { TankRow } from "./tank"
//import { v4 } from "uuid"
import { AircraftDeep } from "../types/aircraftDeep"
import { CargoStore } from "../hooks/cargoStore"
import { getCargoStringFromTank } from "../util"

export const TankList = () => {
  console.log('TankList')
  // re render on air change
  const air = AirStore(x => x.selectedAir) as AircraftDeep
  const [putTankUuids, putCargos, deleteCargos] = CargoStore(x => [x.putTankUuids, x.putCargos, x.deleteCargos])

  // rm old tanks if any
  deleteCargos(CargoStore.getState().tankUuids)
  
  // put new tanks
  const newCargoStrings = air.tanks.map(t => getCargoStringFromTank({momMultiplyer: air.momMultiplyer, tank: t, tankWeightsIDX: 0}))
  putTankUuids(newCargoStrings.map(x => x.uuid))
  putCargos(newCargoStrings)

  return <>
    {
    air.tanks.map((t, idx) => <TankRow tank={t} cargoString={newCargoStrings[idx]} key={newCargoStrings[idx].uuid}/>)
    }
  </>
}