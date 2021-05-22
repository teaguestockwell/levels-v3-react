/* eslint-disable @typescript-eslint/no-unused-vars */
import {getActionsAS, getAir, initAirCargos} from '../hooks/air_store'
import {useUserAirs} from '../hooks/query'
import {AircraftDeep} from '../types/aircraftDeep'
import {Select} from 'antd'
import {Const} from '../utils/const'

const as = getActionsAS()
const {Option} = Select

export const UserAirSelect = () => {
  const {data} = useUserAirs()
  const airName = getAir().name

  const onAirChange = (newName: string) => {
    const newAir = data.data.find((a: AircraftDeep) => a.name === newName)
    initAirCargos(newAir)
    as.setSelectedAir(newAir)
  }

  return (
    <Select
      data-testid={`user air select`}
      defaultValue={airName}
      onChange={onAirChange}
      style={{ textAlign: 'center' ,marginRight: '12px', width: 150}}
      dropdownStyle={{textAlign: 'center'}}
      showSearch
    >
      {data.data.map((a: AircraftDeep) => (
        <Option key={a.name} value={a.name}>
          {a.name}
        </Option>
      ))}
    </Select>
  )
}
