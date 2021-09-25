/* eslint-disable react/display-name */
import * as Types from '../types'
import {getUserActions, useCargo, getUserAir} from '../hooks/user_store'
import {getCargoStringFromTank2} from '../utils/util'
import {Gauge} from '@ant-design/charts'
import {useMemo, useState} from 'react'
import { CardShadow } from './card_shadow'
import { debounce } from 'lodash'
import React from 'react'
import { CustomSelect } from './custom_select'

const cs = getUserActions()

const MemoGauge = React.memo(({selected,max}: {selected:string, max:string}) => {
  return  <Gauge
  percent={Number(selected) / Number(max)}
  range={{color: 'l(0) 0:#08d290 1:#08D290'}}
  indicator={false}
  />
})

accessibility

export const TankRow = ({
  tank,
  cargoString,
  style
}: {
  tank: Types.Tank
  cargoString: Types.CargoString
  style?: any
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const weights = useMemo(() => tank.weightsCSV.split(','), [tank.weightsCSV])
  const moms = useMemo(() => tank.simpleMomsCSV.split(','), [tank.simpleMomsCSV])
  const currentWeight = useCargo(cargoString?.uuid)?.weightEA ?? weights[0]
  const maxWeight = weights[weights.length - 1]
  const debounceToggle = React.useRef(debounce(() => setIsEditing(s => !s), 100)).current
  // useMobileSelectEffect(isEditing)

  const onChange = (newWeight: string) => {
    const newIdx = weights.findIndex((w) => w === newWeight)
    const newMom = Number(moms[newIdx])
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

    <div style={{padding: 10, cursor: 'pointer', ...style, zIndex: 1}} onClick={debounceToggle}>
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
          onClick={(e:any) => e.stopPropagation()}
          data-testid={`${tank.name} select`}
          onSelect={onChange}
          defaultValue={currentWeight}
          style={{textAlign: 'center', fontSize: 12, padding: 0, width: '100%'}}
          dropdownStyle={{textAlign: 'center'}}
          showSearch
          size="small"
          showArrow={false}
          bordered={true}
          onDropdownVisibleChange={debounceToggle}
          open={isEditing}
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
