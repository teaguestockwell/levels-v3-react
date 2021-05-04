import {Button, Dropdown, Menu} from 'antd'
import {Tank} from '../types/aircraftDeep'
import {DownOutlined} from '@ant-design/icons'
import {MenuInfo} from 'rc-menu/lib/interface'
import {getActionsCS} from '../hooks/cargo_store'
import {CargoString} from '../types/cargoString'
import {useMemo, useState} from 'react'
import {getCargoStringFromTank} from '../util'
import {getAir} from '../hooks/air_store'

import fuelGauge from './../images/fuelGauge.png'
import fuelGaugePointer from './../images/fuelGaugePointer.png'

const cs = getActionsCS()

export const TankRow = ({
  tank,
  cargoString,
}: {
  tank: Tank
  cargoString: CargoString
  // tankMax: number
}) => {
  const weights = useMemo(() => tank.weightsCSV.split(','), [tank])
  const [weight, setWeight] = useState(weights[0])

  const onClick = (menuInfo: MenuInfo) => {
    // get new cargo string from tank with new index
    // to update fs && weightEA
    // override uuid
    const newCargoString = {
      ...getCargoStringFromTank({
        idx: Number(String(menuInfo.key).split(',')[0]),
        tank,
        momMultiplyer: getAir().momMultiplyer,
      }),
      uuid: cargoString.uuid,
    }

    cs.putCargos([newCargoString])

    // set state to display new fuel weight
    setWeight(newCargoString.weightEA)
  }

  const menu = useMemo(
    () => (
      <Menu onClick={onClick}>
        {weights.map((lb, i) => (
          <Menu.Item key={i.toString() + ',' + tank.tankId}>{lb}</Menu.Item>
        ))}
      </Menu>
    ),
    []
  )

  const rotateDeg = (parseFloat(weight) / parseFloat(weights[weights.length - 1])) * 180

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        <div>
          {tank.name}
          <br />
          <img src={fuelGauge} />
          <img
            src={fuelGaugePointer}
            style={{
              position: 'absolute',
              left: '53px',
              top: '70px',
              transform: 'rotate(' + rotateDeg + 'deg)',
            }}
          />
          <br />
          {weight}
        </div>
        <DownOutlined />
      </Button>
    </Dropdown>
  )
}
