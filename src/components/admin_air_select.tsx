import {Select} from 'antd'
import {useMemo} from 'react'
import {usePolling} from '../hooks/use_admin_polling'
import {AircraftDeep} from '../types/aircraftDeep'
import {adminStore, getAdminStoreActions} from '../hooks/admin_store'
import isEqual from 'lodash/isEqual'

const as = getAdminStoreActions()
const {Option} = Select

/**
 used to sync the server state of /aircrafts with selected air
 implemented with short polling, zustand, and lodash equality
 */
export const AdminAirSelect = () => {
  const {data} = usePolling('aircraft', 5000)
  const air = adminStore.getState().air

  const loading = <div>loading state</div>
  const error = <div>error state</div>
  const empty = <div>empty state</div>

  // use the key of the client state to find new data in server state,
  // then set client state
  const onAirChange = (newAirId: number) => {
    const serverAir = data.find((x: any) => x.aircraftId === newAirId)
    as.setAir(serverAir)
  }

  // do not render on every req, only when res is different
  const airSelect = useMemo(() => {
    // while !res from server
    if (!data) {
      return loading
    }

    // while !res contains error
    if (data.msg) {
      return error
    }

    // while no data within res
    if (data.length === 0) {
      return empty
    }

    // while no client state for selection,
    // set client aircraft selection to first aircraft from res
    if (!air) {
      as.setAir(data[0])
      return loading
    }

    // try to find server aircraft for client selected aircraft
    const serverStateOfSelectedAir = data.find(
      (a: any) => a.aircraftId === air.aircraftId
    )

    // while client air is not in server res,
    // set client air selection to first air from res
    if (!serverStateOfSelectedAir) {
      as.setAir(data[0])
      return loading
    }

    // while client aircraft !== server server, client air = server air
    if (!isEqual(serverStateOfSelectedAir, air)) {
      as.setAir(serverStateOfSelectedAir)
      return loading
    }

    // while client air selection and server state are synced
    return (
      <Select defaultValue={air.aircraftId} onChange={onAirChange}>
        {data.map((a: AircraftDeep) => (
          <Option key={a.aircraftId} value={a.aircraftId}>
            {a.name}
          </Option>
        ))}
      </Select>
    )
  }, [data])

  return airSelect
}
