/* eslint-disable react/display-name */
import format from 'date-fns/format'
import {getUTCDate} from '../utils/util'
// import {Const} from '../utils/const'
import {useTick} from '../hooks/use_tick'
import React from 'react'
import { MaxContent } from './max_content'

const ClockCol = React.memo(({text, color, textAlign}: {text: string, color:string, textAlign: 'left' | 'right' | 'center'}) => {
  return <div
      style={{
        color,
        fontWeight: 500,
        fontSize: '12px',
        textAlign,
        display: 'flex',
        alignItems: 'center',
        width: 'fit-content'
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

const d = '#9C9C9C'
const e = '#000'

export const Clock = ({style = {}}: {style?: React.CSSProperties}) => {
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
    <div
      style={{
        background: '#fff',
        textAlign: 'center',
        ...style,
      }}
    >
    <MaxContent
      style={{
        paddingTop: 16,
        paddingBottom: 16,
      }}
    >
      <ClockRow texts={['Zone', 'hh:mm:ss', 'JJJ', 'yyyy/mm/dd']} colors={[d,d,d,d]}/>
        <ClockRow texts={['Local', clock.lHMS, clock.lJJJ, clock.lYMD]} colors={[e,e,e,e]}/>
        <ClockRow texts={['Zulu', clock.zHMS, clock.zJJJ, clock.zYMD]} colors={[e,e,e,e]}/>
    </MaxContent>
  </div>
  )
}