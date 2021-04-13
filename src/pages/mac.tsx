import {AddASelect} from '../components/AddASelect'
import {AddCustomCargo} from '../components/AddCustomCargo'
import {AirSelect} from '../components/AirSelect'
import {CargoList} from '../components/CargoList'
import {ConfigSelect} from '../components/ConfigSelect'
import {TankList} from '../components/TankList'
import {AirStore} from '../hooks/AirStore'
import {ConsoleLogger} from '../navigation/ConsoleLogger'
import {Category} from '../types/aircraftDeep'

export const Mac = () => {
  AirStore((s) => s.selectedAir)
  return (
    <>
      <AirSelect />
      <AddASelect />
      <AddCustomCargo />
      <ConfigSelect />
      <TankList />
      <ConsoleLogger />
      <CargoList
        category={[
          Category.Emergency,
          Category.Extra,
          Category.Steward,
          Category.User,
        ]}
      />
    </>
  )
}
