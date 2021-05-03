//import { v4 } from 'uuv4()'
import {v4} from 'uuid'
import {AddASelect} from '../components/add_a_select'
import {AddCustomCargo} from '../components/add_custom_cargo'
import {AirSelect} from '../components/air_select'
import {CargoList} from '../components/cargo_list'
import {ChartC} from '../components/chart_c'
import {ConfigSelect} from '../components/config_select'
import {GetMacButton} from '../components/get_mac_button'
import {PerMac} from '../components/per_mac'
import {TankList} from '../components/tank_list'
import {useAirChangeStoreReset} from '../hooks/air_store'
import {Logger} from '../testUtils/logger'
import {Category} from '../types/aircraftDeep'

export const Mac = () => {
  useAirChangeStoreReset()

  return (
    <>
      <Logger />
      <PerMac />
      <AirSelect />
      <AddASelect key={v4()} />
      <AddCustomCargo key={v4()} />
      <ConfigSelect key={v4()} />
      <GetMacButton key={v4()} />

      <TankList key={v4()} />
      <ChartC key={v4()} />

      <CargoList
        key={v4()}
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
