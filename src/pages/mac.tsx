//import { v4 } from 'uuv4()'
import {v4} from 'uuid'
import {ChartC} from '../components/chart_c'
import {CargoEditModal} from '../components/cargo_edit_modal'
import {GetMacButton} from '../components/get_mac_button'
import {TankList} from '../components/tank_list'
import {Label} from '../components/label'
import {useUserAir} from '../hooks/user_store'
import { CardShadow } from '../components/card_shadow'
import {BarChartOutlined, CarFilled} from '@ant-design/icons'
import { CargoCard } from '../components/cargo_card'

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

      <CardShadow style={{marginTop: 15}} child={
        <>
        <Label text={'Cargo'} icon={<CarFilled style={{color: '#06645E',}}/>}/>
        <CargoCard key={v4()}/>
        </>
      }/>

      <GetMacButton key={v4()} style={{marginTop: 50, marginBottom: 20}}/>
      <CargoEditModal />
    </>
  )
}
