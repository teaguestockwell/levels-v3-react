import {Affix, Row, Col, Typography} from 'antd'
import {Const} from '../const'
import icon from '../img/icon.png'

export const AppBar = ({select}: {select: JSX.Element}) => {
  return (
    <Affix style={{zIndex: 2}}>
      <div
        style={{
          height: Const.HEIGHT.APP_BAR,
          backgroundColor: '#383838',
        }}
      >
        <Row justify="center" style={{paddingTop: '8px'}}>
          <Col span={8}>
              <img src={icon} style={{
              marginLeft: '18px',
              marginTop: -14,
              width: Const.HEIGHT.APP_BAR_NUM - 16,
              height: Const.HEIGHT.APP_BAR_NUM - 16,
            }}/>
             <Typography.Text
              style={{
                textAlign: 'left',
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
  )
}
