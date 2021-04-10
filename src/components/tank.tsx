import { Button, Dropdown, Menu } from 'antd'
import {Tank} from '../types/aircraftDeep'
import {DownOutlined} from '@ant-design/icons'
import {MenuInfo} from 'rc-menu/lib/interface'
import { getActionsCS } from '../hooks/cargoStore'
import { CargoString } from '../types/cargoString'
import { useMemo, useState } from 'react'

export const TankRow = ({tank, cargoString}: {tank:Tank, cargoString: CargoString}) => {
  console.log('Tank ' + cargoString.uuid)
  const cs = getActionsCS()
  const weights = useMemo(()=> tank.weightsCSV.split(','),[tank])
  const [weight, setWeight] = useState(weights[0])

  const onClick = (menuInfo: MenuInfo) => {
    const weightEA = weights[Number(menuInfo.key)]
    cs.putCargos([{...cargoString, weightEA}])
    setWeight(weightEA)
  }

  const menu = useMemo(() => (
    <Menu onClick={onClick}>
      {
      weights.map((lb,i) => <Menu.Item key={i}>{lb}</Menu.Item>)
      }
    </Menu>
  ),[tank])

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button>{`${tank.name}: ${weight}`}<DownOutlined/></Button>
    </Dropdown>
  )
}
