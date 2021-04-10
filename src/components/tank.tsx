import { Button, Dropdown, Menu } from 'antd'
import {Tank} from '../types/aircraftDeep'
import {DownOutlined} from '@ant-design/icons'
import {MenuInfo} from 'rc-menu/lib/interface'
import { CargoStore } from '../hooks/cargoStore'
import { CargoString } from '../types/cargoString'
import { useState } from 'react'

export const TankRow = ({tank, cargoString}: {tank:Tank, cargoString: CargoString}) => {
  console.log('Tank')
  const putCargos = CargoStore(s => s.putCargos)
  const [idx, setIdx] = useState(0)

  const weights = tank.weightsCSV.split(',')

  const onClick = (menuInfo: MenuInfo) => {
    const newIdx = Number(menuInfo.key)
    putCargos([{...cargoString, weightEA: weights[newIdx]}])
    setIdx(newIdx)
  }

  const menu = (
    <Menu onClick={onClick}>
      {
      weights.map((lb,i) => <Menu.Item key={i}>{lb}</Menu.Item>)
      }
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button>{`${tank.name}: ${weights[idx]}`}<DownOutlined/></Button>
    </Dropdown>
  )
}
