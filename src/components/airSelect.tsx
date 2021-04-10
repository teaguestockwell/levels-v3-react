import {Button, Dropdown, Menu} from 'antd'
import {AirStore, selectActionsAS, selectSelectedAir} from '../hooks/airStore'
import {useUserAirs} from '../hooks/useUserAirs'
import {AircraftDeep} from '../types/aircraftDeep'
import {DownOutlined} from '@ant-design/icons'
import {MenuInfo} from 'rc-menu/lib/interface'
import {CargoStore, selectActionsCS} from '../hooks/cargoStore'
import {getCargoSchema} from '../util'

const onAirChange = (menuInfo: MenuInfo, airMap: Map<number, AircraftDeep>) => {
  const cs = selectActionsCS(CargoStore.getState())
  const as = selectActionsAS(AirStore.getState())
  const newAir = airMap.get(Number(menuInfo.key)) as AircraftDeep
  cs.resetCargoStore()
  as.setCargoSchema(getCargoSchema(newAir))
  as.setSelectedAir(newAir)
}

export const AirSelect = () => {
  const selectedAir = AirStore(selectSelectedAir)
  const {data} = useUserAirs()
  const airMap = data as Map<number, AircraftDeep>

  const menu = (
    <Menu onClick={(x) => onAirChange(x,airMap)}>
      {Array.from(airMap.values()).map((a) => (
        <Menu.Item key={a.aircraftId}>{a.name}</Menu.Item>
      ))}
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        {(selectedAir as AircraftDeep).name}
        <DownOutlined />
      </Button>
    </Dropdown>
  )
}
