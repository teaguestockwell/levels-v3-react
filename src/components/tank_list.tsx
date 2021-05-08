import {TankRow} from './tank_row'
import {getCargoMap} from '../hooks/cargo_store'
import {Category} from '../types/aircraftDeep'
import {getAir} from '../hooks/air_store'
import {Col, Row} from 'antd'

export const TankList = () => {
  const air = getAir()
  const cargoStrings = Array.from(getCargoMap().values()).filter(
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
