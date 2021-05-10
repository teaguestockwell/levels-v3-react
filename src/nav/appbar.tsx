import { Affix, Col, Row } from "antd";
import { Const } from "../const";
import { Typography } from "antd";

const {Text} = Typography

export const AppBar = ({select}: {select:JSX.Element}) => {
  const headerStyle: any = {
    height: Const.HEIGHT.APP_BAR,
    backgroundColor: '#383838',
  }

  const textStyle:any = {
    color: 'white',
    fontWeight: 'normal',
    fontSize: '32px',
    lineHeight: '30px',
    paddingLeft: '12px'
  }

  return <Affix>
  <div style={headerStyle}>
    <Row justify='center' style={{paddingTop: '8px'}}>
      <Col span={8}><Text style={textStyle}>Atlas</Text></Col>
      <Col span={8}></Col>
      <Col span={8} style={{textAlign: 'center'}}>{select}</Col>
    </Row>
  </div>
  </Affix>
}