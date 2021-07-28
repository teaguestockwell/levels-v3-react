import {getUserActions, getUserAir} from '../hooks/user_store'
import {useUserAirs} from '../hooks/query'
import {AircraftDeep} from '../types/aircraftDeep'
import {Select} from 'antd'

const cs = getUserActions()
const {Option} = Select

export const UserAirSelect = () => {
  const {data} = useUserAirs()
  const airName = getUserAir().name

  const onAirChange = (newName: string) => {
    const newAir = data.data.find((a: AircraftDeep) => a.name === newName)
    cs.setAir(newAir)
  }

  return (
    <Select
      className="selectBoi"
      bordered={false}
      data-testid={`user air select`}
      defaultValue={airName}
      onChange={onAirChange}
      style={{textAlign: 'right', fontSize: 18}}
      dropdownStyle={{textAlign: 'center'}}
      showSearch
      dropdownMatchSelectWidth={false}
    >
      {data.data.map((a: AircraftDeep) => (
        <Option key={a.name} value={a.name}>
          {a.name}
        </Option>
      ))}
    </Select>
  )
}
