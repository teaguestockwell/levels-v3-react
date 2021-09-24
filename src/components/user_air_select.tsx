import {getUserActions, getUserAir} from '../hooks/user_store'
import {useUserAirs} from '../hooks/query'
import * as Types from '../types'
import {Select} from 'antd'
import { Aircraft } from './icons'

const cs = getUserActions()

export const UserAirSelect = () => {
  const {data} = useUserAirs()
  const airName = getUserAir().name

  const onAirChange = (newName: string) => {
    const newAir = data.aircrafts.find((a: Types.AircraftDeep) => a.name === newName)
    cs.setAir(newAir)
  }

  return (
    <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      paddingRight: 5
    }}
  >
  <Aircraft h={24} w={24} color={'#C4C4C4'} style={{marginLeft: 15}}/>
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
          className: 'pad20'
        }))
      }
    />
    </div>
  )
}
