import { Affix, Row, Col, Typography } from "antd"
import { Const } from "../const"

export const AppBar = ({select}: {select:JSX.Element}) => {
  return <Affix style={{zIndex: 1}}>
  <div
    style={{
      height: Const.HEIGHT.APP_BAR,
      backgroundColor: '#383838',
    }}
  >
    <Row justify="center" style={{paddingTop: '8px'}}>
      <Col span={8}>
        <Typography.Text
          style={{
            color: 'white',
            fontWeight: 'normal',
            fontSize: '32px',
            lineHeight: '30px',
            paddingLeft: '12px',
          }}
        >
          Atlas
        </Typography.Text>
      </Col>
      <Col span={8}></Col>
      <Col span={8} style={{textAlign: 'end', paddingRight: '12px'}}>
        {select}
      </Col>
    </Row>
  </div>
</Affix>
}