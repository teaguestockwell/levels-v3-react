import {getAir} from '../hooks/air_store'
import {TankRow} from './tank_row'
import {getActionsCS} from '../hooks/cargo_store'
import {getCargoStringsFromAirTanks} from '../util'
import {useEffect, useState} from 'react'
import {v4} from 'uuid'
import {CargoString} from '../types/cargoString'

export const TankList = () => {
  const air = getAir()
  const cs = getActionsCS()
  const [cargoStrings, setCargoStrings] = useState<CargoString[]>([])

  useEffect(() => {
    const newCargoStrings = getCargoStringsFromAirTanks(air)

    // put new tanks
    cs.putCargos(newCargoStrings)

    // set state
    setCargoStrings(newCargoStrings)
  }, [air.name])

  return (
    <>
      {air.tanks.map((tank, i) => (
        <TankRow tank={tank} cargoString={cargoStrings[i]} key={v4()} />
      ))}
    </>
  )
}
