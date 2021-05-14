import {Affix, Row, Col, Typography} from 'antd'
import {Const} from '../utils/const'
import icon from '../imgs/icon_round_512.png'

export const AppBar = ({sync, select}: {sync: JSX.Element | null, select:JSX.Element}) => {
  // admin app bars contain AdminAirSelects that sync client and server state automatically

  // user app bars contain UserAirSelects that use init state of service worker cache.
  // the cache is updated by the ClientServerSync. if initState !== currentState the users may opt in to refresh

  const isMobile = window.innerWidth > 750 ? false : true

  return (
    <Affix style={{zIndex: 1}}>
      <div
        style={{
          height: Const.HEIGHT.APP_BAR,
          backgroundColor: '#383838',
        }}
      >
        <Row justify="center" style={{paddingTop: '8px'}}>
          <Col span={7}>
          { window.innerWidth > 750 ?
            <img src={icon} style={{
              marginLeft: '18px',
              marginTop: -14,
              width: Const.HEIGHT.APP_BAR_NUM - 16,
              height: Const.HEIGHT.APP_BAR_NUM - 16,
            }}/>
            : null
          }
            <Typography.Text
              style={{
                color: 'white',
                fontWeight: 'normal',
                fontSize: '32px',
                lineHeight: '30px',
                paddingLeft:  isMobile ? '12px' : '26px',
              }}
            >
              Atlas
            </Typography.Text>
          </Col>
          <Col span={10} style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center'}}>
            {sync}
          </Col>
          <Col span={7} style={{textAlign: 'end', paddingRight: '12px'}}>
            {select}
          </Col>
        </Row>
      </div>
    </Affix>
  )
}
