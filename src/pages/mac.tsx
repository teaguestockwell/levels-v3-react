//import { v4 } from 'uuv4()'
import {v4} from 'uuid'
import {AddASelect} from '../components/add_a_select'
import {AddCustomCargo} from '../components/add_custom_cargo'
import {CargoList} from '../components/cargo_list'
import {ChartC} from '../components/chart_c'
import {ConfigSelect} from '../components/config_select'
import {CargoEditModal} from '../components/cargo_edit_modal'
import {GetMacButton} from '../components/get_mac_button'
import {PerMac} from '../components/per_mac'
import {TankList} from '../components/tank_list'
import {Logger} from '../testUtils/logger'
import {Category} from '../types/aircraftDeep'
import {Label} from '../components/label'
import {useUserAir} from '../hooks/user_store'
import { CardShadow } from '../components/card_shadow'
import {BarChartOutlined} from '@ant-design/icons'

export const Mac = () => {
  useUserAir()

  return (
    <>
      <CardShadow style={{marginTop: 15}} child={<TankList key={v4()}/>}/>
      <CardShadow style={{marginTop: 15}} child={
        <>
        <Label text={'Chart C'} icon={<BarChartOutlined style={{color: '#06645E',}}/>}/>
        <ChartC key={v4()} />
        </>
      }/>
      <Logger />
      <PerMac />
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
