/* eslint-disable @typescript-eslint/no-unused-vars */
import {getActionsAS, getAir} from '../hooks/air_store'
import {useUserAirs} from '../hooks/use_user_airs'
import {AircraftDeep} from '../types/aircraftDeep'
import {Select} from 'antd'
import { Const } from '../const'

const as = getActionsAS()
const {Option} = Select

export const AirSelect = () => {
  const {data} = useUserAirs()
  const airMap = data as Map<number, AircraftDeep>
  console.log('air select')

  const onAirChange = (newName: string) => {
    const newAir = Array.from(airMap.values()).find(a => a.name === newName) as AircraftDeep
    as.setSelectedAir(newAir)
  }

  return <Select
      defaultValue={getAir().name}
      onChange={onAirChange}
      style={{width: Const.SELECT_WIDTH}}
      showSearch
    >
      {Array.from(airMap.values()).map(a => <Option key={a.aircraftId} value={a.name}>{a.name}</Option>)}
    </Select>
}
