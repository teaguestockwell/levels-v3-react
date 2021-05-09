//import { v4 } from 'uuv4()'
import {v4} from 'uuid'
import {AddASelect} from '../components/add_a_select'
import {AddCustomCargo} from '../components/add_custom_cargo'
import {AirSelect} from '../components/air_select'
import {CargoList} from '../components/cargo_list'
import {ChartC} from '../components/chart_c'
import {Clock} from '../components/clock'
import {ConfigSelect} from '../components/config_select'
import {CargoEditModal} from '../components/cargo_edit_modal'
import {GetMacButton} from '../components/get_mac_button'
import {PerMac} from '../components/per_mac'
import {TankList} from '../components/tank_list'
import {useAirChangeStoreReset} from '../hooks/air_store'
import {Logger} from '../testUtils/logger'
import {Category} from '../types/aircraftDeep'
import {Label} from '../components/label'
import {ClientServerSync} from '../components/client_server_sync'

export const Mac = () => {
  useAirChangeStoreReset()

  return (
    <>
      <ClientServerSync key={v4()} />
      <Clock />
      <Label text={'Tanks'} />
      <TankList key={v4()} />
      <Label text={'Chart C'} />
      <ChartC key={v4()} />
      <Logger />
      <PerMac />
      <AirSelect />
      <AddASelect key={v4()} />
      <AddCustomCargo key={v4()} />
      <ConfigSelect key={v4()} />
      <GetMacButton key={v4()} />

      <CargoList
        key={v4()}
        category={[
          Category.Emergency,
          Category.Extra,
          Category.Steward,
          Category.User,
        ]}
      />
      <CargoEditModal />
    </>
  )
}
