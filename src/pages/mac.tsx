import {AddASelect} from '../components/add_a_select'
import {AddCustomCargo} from '../components/add_custom_cargo'
import {AirSelect} from '../components/air_select'
import {CargoList} from '../components/cargo_list'
import {ConfigSelect} from '../components/config_select'
import {TankList} from '../components/tank_list'
import {AirStore} from '../hooks/air_store'
import {ConsoleLogger} from '../navigation/console_logger'
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
