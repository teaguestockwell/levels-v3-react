import {v4} from 'uuid'
import {ChartC} from '../components/chart_c'
import {CargoEditModal} from '../components/cargo_edit_modal'
import {GetMacButton} from '../components/get_mac_button'
import {TankList} from '../components/tank_list'
import {useUserAir} from '../hooks/user_store'
import {CardShadow} from '../components/card_shadow'
import {CargoCard} from '../components/cargo_card'
import { Clock } from '../components/clock'

export const Mac = () => {
  useUserAir()

  return (
    <>
      <Clock style={{marginTop: 8}}/>
      <TankList/>
      <CardShadow style={{borderRadius: 0, paddingTop: 10, paddingBottom: 10}}>
      <ChartC key={v4()} />
      </CardShadow>
    

      <CardShadow style={{borderRadius: 0}}>
        <CargoCard key={v4()} />
    </CardShadow>

      <GetMacButton key={v4()}/>
      <CargoEditModal />
    </>
  )
}
