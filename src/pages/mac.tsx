import {AddASelect} from '../components/add_a_select'
import {AddCustomCargo} from '../components/add_custom_cargo'
import {AirSelect} from '../components/air_select'
import {CargoList} from '../components/cargo_list'
import { ChartC } from '../components/chart_c'
import {ConfigSelect} from '../components/config_select'
import { GetMacButton } from '../components/get_mac_button'
import {TankList} from '../components/tank_list'
import {AirStore} from '../hooks/air_store'
import {Logger} from '../testUtils/logger'
import {Category} from '../types/aircraftDeep'

export const Mac = () => {
  AirStore((s) => s.selectedAir)
  return (
    <>
      <AirSelect />
      <AddASelect />
      <AddCustomCargo />
      <ConfigSelect />
      <GetMacButton />
      <TankList />
      <Logger />
      <ChartC/>
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
