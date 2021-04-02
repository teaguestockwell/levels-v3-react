import { Button, Dropdown, Menu } from 'antd'
import {AirStore} from '../store/airStore'
import {useUserAirs} from '../hooks/useUserAirs'
import { AircraftDeep } from '../types/aircraftDeep'
import {DownOutlined} from '@ant-design/icons'
import { MenuInfo } from 'rc-menu/lib/interface'
import { CargoStore } from '../store/cargoStore'

export const AirSelect = () => {
  const [selectedAir, setSelectedAir] = AirStore(state => [state.selectedAir, state.setSelectedAir])
  const {data} = useUserAirs()
  const [resetCargoStore] = CargoStore(state => [state.resetCargoStore])
  const airMap = data as Map<number, AircraftDeep>
  
  const onAirChange = (menuInfo: MenuInfo) => {
    resetCargoStore()
    setSelectedAir(
      airMap.get( Number(menuInfo.key) ) as AircraftDeep
    )
  }

  const menu = (
    <Menu onClick={onAirChange}>
      {
        Array.from(airMap.values()).map((a) => (
        <Menu.Item key={a.aircraftId}>{a.name}</Menu.Item>
        ))
      }
    </Menu>
  )

  return <Dropdown 
    overlay={menu}
    trigger={['click']}
    >
    <Button >
      {(selectedAir as AircraftDeep).name}
      <DownOutlined />
    </Button>
  </Dropdown>

}