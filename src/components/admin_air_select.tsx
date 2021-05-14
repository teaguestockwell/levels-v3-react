import {Alert, Select, Spin} from 'antd'
import {useMemo} from 'react'
import {usePolling} from '../hooks/query'
import {AircraftDeep} from '../types/aircraftDeep'
import {getAdminStoreActions, useAir} from '../hooks/admin_store'
import isEqual from 'lodash/isEqual'
import {Const} from '../utils/const'
import {initAirCargos} from '../hooks/air_store'
import {v4} from 'uuid'

const as = getAdminStoreActions()
const {Option} = Select

/**
 used to sync the server state of /aircrafts with selected air
 implemented with short polling, zustand, and lodash equality
 */
export const AdminAirSelect = () => {
  const {data} = usePolling('aircraft', 5000)
  const air = useAir()

  // use the key of the client state to find new data in server state,
  // then set client state
  const onAirChange = (newName: string) => {
    const serverAir = data.find((x: any) => x.name === newName)
    as.setAir(serverAir)
    initAirCargos(serverAir)
  }

  // do not render on every req, only when res is different
  return useMemo(() => {
    // while !res from server
    if (!data) {
      return <Spin />
    }

    // while !res contains error
    if (data.msg) {
      return <Alert message="Error" type="error" showIcon />
    }

    // while no data within res
    if (data.length === 0) {
      return <Alert message="No Aircraft" type="warning" showIcon />
    }

    // while no client state for selection,
    // set client aircraft selection to first aircraft from res
    if (!air) {
      as.setAir(data[0])
    }

    // try to find server aircraft for client selected aircraft
    const serverStateOfSelectedAir = data.find(
      (a: any) => a.aircraftId === air?.aircraftId
    )

    // while client air is not in server res,
    // set client air selection to first air from res
    if (!serverStateOfSelectedAir) {
      as.setAir(data[0])
      return <Spin />
    }

    // while client aircraft !== server server, client air = server air
    if (!isEqual(serverStateOfSelectedAir, air)) {
      as.setAir(serverStateOfSelectedAir)
      return <Spin />
    }

    // while client air selection and server state are synced
    return (
      <Select
        key={v4()}
        defaultValue={air?.name}
        onChange={onAirChange}
        showSearch
        style={{width: Const.SELECT_WIDTH, textAlign: 'center'}}
        dropdownStyle={{textAlign: 'center'}}
      >
        {data.map((a: AircraftDeep) => (
          <Option key={a.aircraftId} value={a.name}>
            {a.name}
          </Option>
        ))}
      </Select>
    )
  }, [data?.data, air])
}
