import {Col, Row} from 'antd'
import {Typography} from 'antd'

const {Text} = Typography

export const Label = ({text, icon}: {text: string, icon: JSX.Element}) => {
  return (
    <Row justify="start" style={{margin: '8px 0px 8px 0px'}}>
        <Col span={40}>
          <div
            style={{
              padding: '4px 14px 3px 14px',
            }}
            >
            {icon}
            <Text
              style={{
                paddingLeft: 6,
                textAlign: 'center',
                color: '#06645E',
                fontWeight: 'normal',
                fontSize: '18px',
                textShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)'
              }}
            >
              {text}
            </Text>
          </div>
        </Col>
    </Row>
  )
}
