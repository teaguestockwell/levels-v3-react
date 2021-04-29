import {Button, Dropdown, Menu} from 'antd'
import {useMemo} from 'react'
import {usePolling} from '../hooks/use_admin_polling'
import {AircraftDeep} from '../types/aircraftDeep'
import {DownOutlined} from '@ant-design/icons'
import {MenuInfo} from 'rc-menu/lib/interface'
import {adminStore, getAdminStoreActions} from '../hooks/admin_store'
import isEqual from 'lodash/isEqual'

const as = getAdminStoreActions()

/**
 used to sync the server state of /aircrafts with selected air
 implemented with short polling, zustand, and lodash equality
 */
export const AdminAirSelect = () => {
  const {data} = usePolling('aircraft', 5000)
  const air = adminStore.getState().air

  const loading = <div>loading state</div>
  const error = <div>error state</div>
  const empty = <div>empty state</div>

  const onAirChange = (menuInfo: MenuInfo) => {
    const newKey = Number(menuInfo.key)
    as.setAir(data.find((x: any) => x.aircraftId === newKey) as AircraftDeep)
  }

  const airSelect = useMemo(() => {
    if (!data) {
      return loading
    }

    if (data.msg) {
      return error
    }

    if (data.length === 0) {
      return empty
    }

    if (!air) {
      as.setAir(data[0])
      return loading
    }

    const serverStateOfSelectedAir = data.find(
      (a: any) => a.aircraftId === air.aircraftId
    )

    if (!serverStateOfSelectedAir) {
      as.setAir(data[0])
      return loading
    }

    if (!isEqual(serverStateOfSelectedAir, air)) {
      as.setAir(serverStateOfSelectedAir)
      return loading
    }

    const menu = (
      <Menu onClick={(x) => onAirChange(x)}>
        {data.map((a: AircraftDeep) => (
          <Menu.Item key={a.aircraftId}>{a.name}</Menu.Item>
        ))}
      </Menu>
    )

    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <Button>
          {(air as AircraftDeep).name}
          <DownOutlined />
        </Button>
      </Dropdown>
    )
  }, [data])

  return airSelect
}
