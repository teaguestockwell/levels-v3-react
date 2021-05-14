/* eslint-disable @typescript-eslint/no-unused-vars */
import {Col, Row} from 'antd'
import {useEffect, useState} from 'react'
import {Typography} from 'antd'
import {format} from 'date-fns'
import {getUTCDate} from '../utils/util'
import {Const} from '../utils/const'

const {Text} = Typography

export const Clock = () => {
  const [lnow, setNow] = useState(new Date())
  const znow = getUTCDate(lnow)

  useEffect(() => {
    const time = setTimeout(() => setNow(new Date()), 1000)
    return () => clearTimeout(time)
  }, [lnow])

  const clock = {
    lHMS: format(lnow, 'HH:mm:ss'),
    lJJJ: format(lnow, 'DDD'),
    lYMD: format(lnow, 'yyyy-LL-dd'),

    zHMS: format(znow, 'HH:mm:ss'),
    zJJJ: format(znow, 'DDD'),
    zYMD: format(znow, 'yyyy-LL-dd'),
  }

  const getCol = (
    str: string,
    color = '#000000',
    textAlign: any = 'center'
  ) => (
    <Col span={6} style={{display: 'inline-flex', justifyContent: 'center'}}>
      <Text
        style={{
          color,
          fontWeight: 'normal',
          fontSize: '14px',
          lineHeight: '18px',
        }}
      >
        {str}
      </Text>
    </Col>
  )

  const rowProps = {
    justify: 'center',
    type: 'flex',
  } as any

  return (
    <div
      style={{
        boxShadow: Const.BOX_SHADOW,
        paddingBottom: '10px',
        paddingTop: '10px',
      }}
    >
      <Row {...rowProps}>
        {getCol('Zone', Const.COLORS.TXT_DISABLED, 'left')}
        {getCol('hh:mm:ss', Const.COLORS.TXT_DISABLED)}
        {getCol('JJJ', Const.COLORS.TXT_DISABLED)}
        {getCol('YYYY-MM-DD', Const.COLORS.TXT_DISABLED)}
      </Row>
      <Row {...rowProps}>
        {getCol('Local', Const.COLORS.TXT_RED, 'left')}
        {getCol(clock.lHMS)}
        {getCol(clock.lJJJ)}
        {getCol(clock.lYMD)}
      </Row>
      <Row {...rowProps}>
        {getCol('Zulu', Const.COLORS.TXT_RED, 'left')}
        {getCol(clock.zHMS)}
        {getCol(clock.zJJJ)}
        {getCol(clock.zYMD)}
      </Row>
    </div>
  )
}
