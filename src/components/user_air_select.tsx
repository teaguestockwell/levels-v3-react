import {getUserActions, getUserAir} from '../hooks/user_store'
import {useUserAirs} from '../hooks/query'
import * as Types from '../types'
import {Select} from 'antd'

const cs = getUserActions()

export const UserAirSelect = () => {
  const {data} = useUserAirs()
  const airName = getUserAir().name

  const onAirChange = (newName: string) => {
    const newAir = data.aircrafts.find((a: Types.AircraftDeep) => a.name === newName)
    cs.setAir(newAir)
  }

  return (
    <Select
      size="large"
      bordered={false}
      data-testid={`user air select`}
      defaultValue={airName}
      onChange={onAirChange}
      style={{width: '100%', textAlign: 'left', display: 'flex', fontWeight: 600}}
      dropdownStyle={{textAlign: 'left'}}
      showSearch
      dropdownMatchSelectWidth={false}
      virtual={true}
      options={
        data.aircrafts.map((air: any) => ({
          value: air.name,
          label: air.name,
        }))
      }
    />
  )
}
