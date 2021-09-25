import {Spin} from 'antd'
import {useMemo} from 'react'
import {usePolling} from '../hooks/query'
import {getAdminStoreActions, useAir} from '../hooks/admin_store'
import isEqual from 'lodash/isEqual'
import {v4} from 'uuid'
import { Aircraft } from './icons'
import { CustomSelect } from './custom_select'

const as = getAdminStoreActions()

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
  }

  // do not render on every req, only when res is different
  return useMemo(() => {
    // while !res from server
    if (!data || isEqual(data, {})) {
      return <Spin style={{paddingRight: 20, paddingLeft: 20, paddingTop: '6px'}} />
    }

    // while !res contains error
    if (data.msg) {
      return (
        <div style={{color: 'white', fontSize: 24}}>Error refresh page!</div>
      )
    }

    // while no data within res
    if (data.length === 0) {
      return (
        <div style={{color: 'white', fontSize: 24}}>You have no aircraft!</div>
      )
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
      <CustomSelect
        bordered={false}
        className="selectBoi"
        stateKey="adminAirSelect"
        data-testid="admin air select"
        key={v4()}
        defaultValue={air?.name as string}
        onChange={onAirChange}
        showSearch
        style={{width: '100%', textAlign: 'left', display: 'flex', fontWeight: 600, fontSize: 18}}
        dropdownStyle={{textAlign: 'left'}}
        dropdownMatchSelectWidth={false}
        virtual={true}
        options={
          data.map((a: any) => ({
            value: a.name,
            label: a.name,
            className: 'pad20'
          }))
        }
        />
      </div>
    )
  }, [data, air])
}
