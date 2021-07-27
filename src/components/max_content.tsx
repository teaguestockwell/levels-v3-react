import { Col, Row } from 'antd'
import { v4 } from 'uuid'
import { Const } from '../utils/const'

export const MaxContent = ({children}: {children: JSX.Element[] | JSX.Element}) => {
  return (
    <Row
    key={v4()}
    justify={'center'}
    >
      <Col
        style={{maxWidth: Const.MAX_WIDTH, width: '100%'}}
      >
        {children}
      </Col>
    </Row>
  )
}
