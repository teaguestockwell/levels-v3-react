/* eslint-disable @typescript-eslint/no-unused-vars */
import { AirStore, getAir, selectSelectedAir } from "../hooks/airStore"
import { TankRow } from "./tank"
import { CargoStore, getActionsCS } from "../hooks/cargoStore"
import { getCargoStringsFromAirTanks } from "../util"
import { useEffect, useState } from "react"
import { CargoString } from "../types/cargoString"


export const TankList = () => {
  const air = getAir()
  const cs = getActionsCS()
  const [cargoStrings, setCargoStrings] = useState< CargoString[] | undefined >()

  useEffect(() => {
    // create new cs from new air
    const newCargoStrings = getCargoStringsFromAirTanks(air)

    // rm old tanks if any
    cs.deleteCargos(CargoStore.getState().tankUuids)
    
    // put new tanks
    cs.putTankUuids(newCargoStrings.map(x => x.uuid))
    cs.putCargos(newCargoStrings)

    setCargoStrings(newCargoStrings)
  },[air.name])

  return <>
    {
    cargoStrings ?
      air.tanks.map((t, idx) => <TankRow tank={t} cargoString={cargoStrings[idx]} key={cargoStrings[idx].uuid}/>)
    : <div></div>
    }
  </>
}