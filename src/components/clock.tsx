import React from 'react'
import {Col, Row } from 'antd'
import {useEffect, useState} from 'react'
import {Typography} from 'antd'
import {format} from 'date-fns'
import {getUTCDate} from '../util'
import {Const} from '../const'
import {v4} from 'uuid'

const {Text} = Typography

export const Clock = () => {
  const [lnow, setNow] = useState(new Date())
  const znow = getUTCDate(lnow)
  useEffect(() => {
    const time = setTimeout(() => setNow(new Date()), 1000)
    return () => clearTimeout(time)
  }, [lnow])

  const df = {
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
    <Col key={v4()} span={5}>
      <Text
        style={{
          textAlign,
          color,
          //fontFamily: 'DM Sans',
          fontWeight: 'normal',
          fontSize: '14px',
          lineHeight: '18px',
        }}
      >
        {str}
      </Text>
    </Col>
  )

  return (
    <div
      style={{
        boxShadow: Const.BOX_SHADOW,
        paddingBottom: '10px',
        paddingTop: '10px',
      }}
    >
      <Row justify="center">
        <Col flex={2} />
        {[
          getCol('Zone', Const.COLORS.TXT_DISABLED, 'left'),
          getCol('hh:mm:ss', Const.COLORS.TXT_DISABLED),
          getCol('JJJ', Const.COLORS.TXT_DISABLED),
          getCol('YYYY-MM-DD', Const.COLORS.TXT_DISABLED),
        ]}
        <Col flex={2} />
      </Row>
      <Row justify="center">
        <Col flex={2} />
        {[
          getCol('Local', Const.COLORS.TXT_RED, 'left'),
          getCol(df.lHMS),
          getCol(df.lJJJ),
          getCol(df.lYMD),
        ]}
        <Col flex={2} />
      </Row>
      <Row justify="center">
        <Col flex={2} />
        {[
          getCol('Zulu', Const.COLORS.TXT_RED, 'left'),
          getCol(df.zHMS),
          getCol(df.zJJJ),
          getCol(df.zYMD),
        ]}
        <Col flex={2} />
      </Row>
    </div>
  )
}
