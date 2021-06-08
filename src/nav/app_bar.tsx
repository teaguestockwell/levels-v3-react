/* eslint-disable @typescript-eslint/no-unused-vars */
import {Affix, Row, Col, Typography} from 'antd'
import {Const} from '../utils/const'
import icon from '../imgs/icon_round_512.png'

export const AppBar = ({
  sync,
  select,
}: {
  sync: JSX.Element | null
  select: JSX.Element
}) => {
  // admin app bars contain AdminAirSelects that sync client and server state automatically

  // user app bars contain UserAirSelects that use init state of service worker cache.
  // the cache is updated by the ClientServerSync. if initState !== currentState the users may opt in to refresh

  const isMobile = window.innerWidth > 750 ? false : true
  // <Affix style={{zIndex: 1}} offsetTop={0}>

  return (
      <div
        style={{
          zIndex: 2,
          position: 'fixed',
          width: 375,
          height: 130,
          left: 0,
          top: 0,
          background: '#06645E',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
          borderRadius: '0px 0px 20px 20px'
        }}
      >
        <Row justify="center" style={{paddingTop: '8px'}}>
          <Col span={8}>
            {window.innerWidth > 750 ? (
              <img
                src={icon}
                style={{
                  marginLeft: '18px',
                  marginTop: -14,
                  width: Const.HEIGHT.APP_BAR_NUM - 16,
                  height: Const.HEIGHT.APP_BAR_NUM - 16,
                }}
              />
            ) : null}
            <Typography.Text
              style={{
                color: 'white',
                fontWeight: 'normal',
                fontSize: '24px',
                lineHeight: '30px',
                paddingLeft: isMobile ? '12px' : '26px',
                textShadow: '0px 2px 4px rgba(255, 255, 255, 0.25)'
              }}
            >
              Atlas
            </Typography.Text>
          </Col>
          <Col span={16} style={{textAlign: 'end',}}>
            {sync}
            {select}
          </Col>
        </Row>
      </div>
  )
}
