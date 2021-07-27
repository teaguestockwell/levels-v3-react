import {Col, Row} from 'antd'

export const Label = ({text, icon, style}: {text: string, icon: JSX.Element, style?:any}) => {
  return (
    <Row justify="start" style={{marginLeft: 10, paddingTop:12, ...style}}>
      <Col span={40} style={style}>
        {icon}
      </Col>
      <Col>
        <div
            style={{
              paddingLeft: 6,
              textAlign: 'center',
              color: '#06645E',
              fontWeight: 'normal',
              fontSize: '18px',
              textShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)'
            }}
          >{text}</div>
      </Col>
    </Row>
  )
}
