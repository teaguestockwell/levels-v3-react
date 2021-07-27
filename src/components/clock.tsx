
import {Col, Row,Typography} from 'antd'
import {format} from 'date-fns'
import {getUTCDate} from '../utils/util'
import {Const} from '../utils/const'
import {useTick} from '../hooks/use_tick'
import { MaxContent } from './max_content'

const {Text} = Typography

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


const rowProps = {
  justify: 'center',
  type: 'flex',
  style: {padding: '0px 12px 8px 12px'}
} as any

export const Clock = () => {
  useTick(1000)
  const clock = getClock()

  return <>    
  <MaxContent>
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
  </MaxContent>  
</>
}
