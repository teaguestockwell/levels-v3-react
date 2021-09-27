/* eslint-disable react/display-name */
import * as Types from '../types'
import {getUserActions, useCargo, getUserAir} from '../hooks/user_store'
import {getCargoStringFromTank2} from '../utils/util'
import {Gauge} from '@ant-design/charts'
import {useMemo } from 'react'
import { CardShadow } from './card_shadow'
import React from 'react'
import { CustomSelect, dbToggle } from './custom_select'

const cs = getUserActions()

const MemoGauge = React.memo(({selected,max}: {selected:string, max:string}) => {
  return  <Gauge
  percent={Number(selected) / Number(max)}
  range={{color: 'l(0) 0:#08d290 1:#08D290'}}
  indicator={false}
  />
})

export const onChange = ({
  weights,
  newWeight,
  tank,
  cargoString,
  moms
}
:
{
  weights:string[],
  newWeight:string,
  tank: Types.Tank,
  cargoString:Types.CargoString
  moms: string[]
}
) => {
  // 1
  const newIdx = weights.findIndex((w) => w === newWeight)
  console.log('newIdx', newIdx)
  // 56
  const newMom = Number(moms[newIdx])
  // 500
  const newWeightEA = Number(weights[newIdx])

  const newCargoString = {
    ...getCargoStringFromTank2({
      tankName: tank.name,
      weightEA: newWeightEA,
      simpleMom: newMom,
      momMultiplyer: getUserAir().momMultiplyer,
    }),
    uuid: cargoString.uuid,
  }

  cs.putCargos([newCargoString])
}

export const TankRow = ({
  tank,
  cargoString,
  style
}: {
  tank: Types.Tank
  cargoString: Types.CargoString
  style?: any
}) => {
  const weights = useMemo(() => tank.weightsCSV.split(','), [tank.weightsCSV])
  const moms = useMemo(() => tank.simpleMomsCSV.split(','), [tank.simpleMomsCSV])
  const currentWeight = useCargo(cargoString?.uuid)?.weightEA ?? weights[0]
  const maxWeight = weights[weights.length - 1]

  const options = useMemo(
    () => weights.map(w => ({
      label: w,
      value: w,
      className: 'pad20'
    })),
    
    [weights]
  )

  return (
    <CardShadow style={{boxShadow: '0px 0px 3.6095px rgba(0, 0, 0, 0.15)', marginBottom: 15}}>

    <div style={{padding: 10, cursor: 'pointer', ...style, zIndex: 1}} onClick={() => dbToggle('tank' + tank.tankId)}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            color: '#000',
            fontWeight: 'normal',
            fontSize: '12px',
          }}
          >
          {tank.name}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: -5,
        }}
        >
        <div
          style={{
            width: 75,
            height: 75,
          }}
          >
          {
            process.env.IS_TEST ? <div>chart</div> : <MemoGauge selected={currentWeight} max={maxWeight} />
          }
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: -2,
          zIndex: 2,
        }}
        >
        <CustomSelect
          stateKey={'tank' + tank.tankId}
          data-testid={`${tank.name} select`}
          onChange={(newWeight:string) => onChange({
            newWeight,
            moms,
            weights,
            cargoString,
            tank,
          })}
          defaultValue={currentWeight}
          style={{textAlign: 'center', fontSize: 12, padding: 0, width: '100%'}}
          dropdownStyle={{textAlign: 'center'}}
          showSearch
          size="small"
          showArrow={false}
          bordered={true}
          showAction={['focus']}
          dropdownMatchSelectWidth={false}
          virtual={true}
          options={options}
          />
      </div>
    </div>
  </CardShadow>
  )
}
