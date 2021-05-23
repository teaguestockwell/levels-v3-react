import {TankRow} from './tank_row'
import {userStore} from '../hooks/user_store'
import {Category} from '../types/aircraftDeep'
import {getUserAir} from '../hooks/user_store'
import {Col, Row} from 'antd'

export const TankList = () => {
  const air = getUserAir()
  const cargoStrings = Array.from(userStore.getState().cargoMap.values()).filter(
    (c) => c.category === Category.Tank
  )

  return (
    <Row justify="center" style={{paddingBottom: '10px'}}>
      {air.tanks.map((tank, i) => (
        <Col key={tank.tankId} flex={6}>
          <TankRow
            tank={tank}
            cargoString={cargoStrings[i]}
            key={tank.tankId}
          />
        </Col>
      ))}
    </Row>
  )
}
