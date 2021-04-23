import {TankRow} from './tank_row'
import {getCargoMap} from '../hooks/cargo_store'
import {Category} from '../types/aircraftDeep'
import {getAir} from '../hooks/air_store'

export const TankList = () => {
  const air = getAir()
  const cargoStrings = Array.from(getCargoMap().values()).filter(
    (c) => c.category === Category.Tank
  )

  return (
    <>
      {air.tanks.map((tank, i) => (
        <TankRow tank={tank} cargoString={cargoStrings[i]} key={tank.tankId} />
      ))}
    </>
  )
}
