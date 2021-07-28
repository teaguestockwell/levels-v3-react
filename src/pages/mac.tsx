import {v4} from 'uuid'
import {ChartC} from '../components/chart_c'
import {CargoEditModal} from '../components/cargo_edit_modal'
import {GetMacButton} from '../components/get_mac_button'
import {TankList} from '../components/tank_list'
import {Label} from '../components/label'
import {useUserAir} from '../hooks/user_store'
import {CardShadow} from '../components/card_shadow'
import {CargoCard} from '../components/cargo_card'
import {Const} from '../utils/const'

export const Mac = () => {
  useUserAir()

  return (
    <>
      <CardShadow style={{marginTop: 15}} child={<TankList key={v4()} />} />

      <CardShadow
        style={{marginTop: 15}}
        child={
          <>
            <Label
              text={'Chart C'}
              icon={
                <svg width="24" height="23" viewBox="0 0 24 23">
                  <path d={Const.PATH.CHART_FILL} fill="#06645E" />
                </svg>
              }
            />
            <ChartC key={v4()} />
          </>
        }
      />

      <CardShadow
        style={{marginTop: 15}}
        child={
          <>
            <Label
              style={{marginLeft: 8, paddingBottom: 4}}
              text={'Cargo'}
              icon={
                <svg width="30" height="20" viewBox="0 0 30 20">
                  <path d={Const.PATH.CAR_FILL} fill="#06645E" />
                </svg>
              }
            />
            <CargoCard key={v4()} />
          </>
        }
      />

      <GetMacButton key={v4()} style={{marginTop: 50, marginBottom: 20}} />
      <CargoEditModal />
    </>
  )
}
