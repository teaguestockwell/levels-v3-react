import {Affix, Col, Row} from 'antd'
import {Const} from '../const'
import {Typography} from 'antd'

const {Text} = Typography

export const AppBar = ({select}: {select: JSX.Element}) => {
  return (
    <Affix>
      <div
        style={{
          height: Const.HEIGHT.APP_BAR,
          backgroundColor: '#383838',
        }}
      >
        <Row justify="center" style={{paddingTop: '8px'}}>
          <Col span={8}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'normal',
                fontSize: '32px',
                lineHeight: '30px',
                paddingLeft: '12px',
              }}
            >
              Atlas
            </Text>
          </Col>
          <Col span={8}></Col>
          <Col span={8} style={{textAlign: 'end', paddingRight: '12px'}}>
            {select}
          </Col>
        </Row>
      </div>
    </Affix>
  )
}
