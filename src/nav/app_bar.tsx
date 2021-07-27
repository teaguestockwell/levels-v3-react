
import {Row, Col} from 'antd'
import { Clock } from '../components/clock'


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
  return (
      <div
        style={{
          zIndex: 2,
          position: 'fixed',
          height: 130,
          left: 0,
          right: 0,
          top: 0,
          background: '#06645E',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
          borderRadius: '0px 0px 20px 20px',
          textAlign: 'center',
        }}
      > 
        <Row justify="center" style={{
    height: 44,
    padding: '4px 12px 10px 12px'
  }}>
    <Col span={8} style={{justifyContent: 'flex-start'}}>
        <div
          style={{
            textShadow: '0px 2px 4px rgba(255, 255, 255, 0.25)',
            fontFamily: 'Revalia',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 24,
            textAlign: 'left',
            color: 'white'
          }}
          >Levels</div>
    </Col>
    <Col span={16} style={{textAlign: 'end', paddingTop:4}}>
        {select}
        {sync}
    </Col>
  </Row>
  <Clock/>
      </div>
  )
}
