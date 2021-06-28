/* eslint-disable @typescript-eslint/no-unused-vars */
import {Row, Col, Typography} from 'antd'
import {Const} from '../utils/const'
import { useTick } from '../hooks/use_tick'
import { getUTCDate } from '../utils/util'
import {format} from 'date-fns'
const {Text} = Typography

const getCol = (
  str: string,
  color = '#fff',
  align = 'center'
) => (
  <Col span={6} style={{display: 'inline-flex', justifyContent: align}}>
    <Text
      style={{
        color,
        fontWeight: 'normal',
        fontSize: '12px',
      }}
    >
      {str}
    </Text>
  </Col>
)

const getClock = () => {
  const lnow = new Date()
  const znow = getUTCDate(lnow)

  return {
    lHMS: format(lnow, 'HH:mm:ss'),
    lJJJ: format(lnow, 'DDD'),
    lYMD: format(lnow, 'yyyy/LL/dd'),

    zHMS: format(znow, 'HH:mm:ss'),
    zJJJ: format(znow, 'DDD'),
    zYMD: format(znow, 'yyyy/LL/dd'),
  }
}

const rowProps = {
  justify: 'center',
  type: 'flex',
  style: {padding: '0px 12px 8px 12px'}
} as any

export const AppBar = ({
  sync,
  select,
}: {
  sync: JSX.Element | null
  select: JSX.Element
}) => {
  useTick(1000)
  const clock = getClock()


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
          borderRadius: '0px 0px 20px 20px'
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
          
        <Row {...rowProps}>
          {getCol('Zone', Const.COLORS.TXT_DISABLED, 'flex-start')}
          {getCol('hh:mm:ss', Const.COLORS.TXT_DISABLED)}
          {getCol('JJJ', Const.COLORS.TXT_DISABLED)}
          {getCol('yyyy/mm/dd', Const.COLORS.TXT_DISABLED, 'flex-end')}
        </Row>
        <Row {...rowProps}>
          {getCol('Local', Const.COLORS.TXT_DISABLED, 'flex-start')}
          {getCol(clock.lHMS)}
          {getCol(clock.lJJJ)}
          {getCol(clock.lYMD, '#fff', 'flex-end')}
        </Row>
        <Row {...rowProps}>
          {getCol('Zulu', Const.COLORS.TXT_DISABLED, 'flex-start')}
          {getCol(clock.zHMS)}
          {getCol(clock.zJJJ)}
          {getCol(clock.zYMD, '#fff', 'flex-end')}
        </Row>
      </div>
  )
}
