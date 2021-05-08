import {Col, Row} from 'antd'
import {Typography} from 'antd'

const {Text} = Typography

export const Label = ({text}: {text: string}) => {
  return (
    <Row justify="start" style={{margin: '8px 0px 8px 0px'}}>
      <div
        style={{
          background: '#787982',
          borderRadius: '5px',
          margin: '0px 0px 0px 14px',
        }}
      >
        <Col span={40}>
          <div
            style={{
              padding: '4px 14px 3px 14px',
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontWeight: 'normal',
                fontSize: '18px',
              }}
            >
              {text}
            </Text>
          </div>
        </Col>
      </div>
    </Row>
  )
}
