/* eslint-disable react/display-name */
import format from 'date-fns/format'
import {getUTCDate} from '../utils/util'
import {Const} from '../utils/const'
import {useTick} from '../hooks/use_tick'
import React from 'react'

const ClockCol = React.memo(({text, color, textAlign}: {text: string, color:string, textAlign: 'left' | 'right' | 'center'}) => {
  return <div
      style={{
        width: '100%',
        color,
        fontWeight: 'normal',
        fontSize: '12px',
        textAlign,
      }}
    >
      {text}
    </div>
})

const ClockRow = React.memo(({texts,colors}:{texts: [string,string,string,string], colors:[string,string,string,string]}) => {
  return <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    height: 26,
    paddingLeft: 14,
    paddingRight: 14,
  }}>
    <ClockCol text={texts[0]} color={colors[0]} textAlign="left"/>
    <ClockCol text={texts[1]} color={colors[1]} textAlign="center"/>
    <ClockCol text={texts[2]} color={colors[2]} textAlign="center"/>
    <ClockCol text={texts[3]} color={colors[3]} textAlign="right"/>
</div>
})

const d = Const.COLORS.TXT_DISABLED
const e = '#fff'

export const Clock = () => {
  useTick(1000)
  const lnow = new Date()
  const znow = getUTCDate(lnow)
  const clock = {
    lHMS: format(lnow, 'HH:mm:ss'),
    lJJJ: format(lnow, 'DDD'),
    lYMD: format(lnow, 'yyyy/LL/dd'),

    zHMS: format(znow, 'HH:mm:ss'),
    zJJJ: format(znow, 'DDD'),
    zYMD: format(znow, 'yyyy/LL/dd'),
  }
  

  return (
    <>
        <ClockRow texts={['Zone', 'hh:mm:ss', 'JJJ', 'yyyy/mm/dd']} colors={[d,d,d,d]}/>
        <ClockRow texts={['Local', clock.lHMS, clock.lJJJ, clock.lYMD]} colors={[d,e,e,e]}/>
        <ClockRow texts={['Zulu', clock.zHMS, clock.zJJJ, clock.zYMD]} colors={[d,e,e,e]}/>
    </>
  )
}