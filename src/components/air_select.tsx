import {Button, Dropdown, Menu} from 'antd'
import {getActionsAS, getAir} from '../hooks/air_store'
import {useUserAirs} from '../hooks/use_user_airs'
import {AircraftDeep} from '../types/aircraftDeep'
import {DownOutlined} from '@ant-design/icons'
import {MenuInfo} from 'rc-menu/lib/interface'

const as = getActionsAS()

export const AirSelect = () => {
  const {data} = useUserAirs()
  const airMap = data as Map<number, AircraftDeep>
  
  const onAirChange = (menuInfo: MenuInfo) => {
    const newAir = airMap.get(Number(menuInfo.key)) as AircraftDeep
    as.setSelectedAir(newAir)
  }

  const menu = (
    <Menu onClick={(x) => onAirChange(x)}>
      {Array.from(airMap.values()).map((a) => (
        <Menu.Item key={a.aircraftId}>{a.name}</Menu.Item>
      ))}
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        {getAir().name}
        <DownOutlined />
      </Button>
    </Dropdown>
  )
}
