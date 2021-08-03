/* eslint-disable react/display-name */
import {getUserActions, useCargo} from '../hooks/user_store'
import React from 'react'

const cs = getUserActions()

const TextCol = React.memo(({text}: {text: string}) => {
  return <div
      style={{
        fontSize: 12,
        textAlign: 'left',
        color: '#C4C4C4',
        width: '100%',
        display: 'flex',
      }}
    >
      {text}
    </div>
})

const TextRow = React.memo(({texts}: {texts: string[]}) => {
  return <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: 6
    }}
  >
    {texts.map(t => <TextCol key={t} text={t} />)}
  </div>
})

export const CargoEditRow = React.memo(({uuid}: {uuid: string}) => {
  const cargo = useCargo(uuid)
  const weightEa = cargo.weightEA ? cargo.weightEA : '???'
  const fs = cargo.fs ? cargo.fs : '???'
  const qty = cargo.qty ? cargo.qty : '???'
  const name = cargo.name ? cargo.name : '???'
  const nameColor = cargo.isValid ? '#383838' : '#FF4D4F'

  return (
    <div
      onClick={() => cs.setEditUuid(uuid)}
      style={{
        cursor: 'pointer',
        paddingTop: 10,
      }}
    >
      <div
        style={{
          fontSize: 12,
          display: 'flex',
          textAlign: 'left',
          color: nameColor,
        }}
      >
        {name}
      </div>

      <TextRow texts={['Weight Ea','FS','Qty']}/>
      <TextRow texts={[weightEa, fs, qty]}/>
    </div>
  )
})
