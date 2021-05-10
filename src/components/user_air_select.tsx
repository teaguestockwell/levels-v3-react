/* eslint-disable @typescript-eslint/no-unused-vars */
import {getActionsAS, getAir, initAirCargos} from '../hooks/air_store'
import {useUserAirs } from '../hooks/use_user_airs'
import {AircraftDeep} from '../types/aircraftDeep'
import {Select} from 'antd'
import {Const} from '../const'

const as = getActionsAS()
const {Option} = Select

export const UserAirSelect = () => {
  const {data} = useUserAirs()

  const onAirChange = (newName: string) => {
    const newAir = data.airs.find((a: AircraftDeep) => a.name === newName)
    initAirCargos(newAir)
    as.setSelectedAir(newAir)
  }

  return (
    <Select
      defaultValue={getAir().name}
      onChange={onAirChange}
      style={{width: Const.SELECT_WIDTH}}
      showSearch
    >
      {data.airs.map((a: AircraftDeep) => (
        <Option key={a.aircraftId} value={a.name}>
          {a.name}
        </Option>
      ))}
    </Select>
  )
}
