import {v4} from 'uuid'
import {ChartC} from '../components/chart_c'
import {CargoEditModal} from '../components/cargo_edit_modal'
import {GetMacButton} from '../components/get_mac_button'
import {TankList} from '../components/tank_list'
import {useUserAir} from '../hooks/user_store'
import {CardShadow} from '../components/card_shadow'
import {CargoCard} from '../components/cargo_card'
import { Clock } from '../components/clock'
import { AirSyncSelect } from '../nav/air_sync_select'

export const Mac = () => {
  useUserAir()

  return (
    <div data-testId="mac-page">
      <Clock/>
      <AirSyncSelect type='user' style={{marginTop: 15}}/>
      <TankList/>
      <CardShadow style={{borderRadius: 0,marginTop: 0}}>
      <ChartC key={v4()} />
      </CardShadow>
    

      <CargoCard key={v4()} />

      <GetMacButton key={v4()}/>
      <CargoEditModal />
    </div>
  )
}
