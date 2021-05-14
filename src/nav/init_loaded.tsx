import {useUserAirs} from '../hooks/query'
import {AirStore, getActionsAS, initAirCargos} from '../hooks/air_store'
import {Result, Skeleton} from 'antd'
import {DynamicMainNav} from './dynamic_main_nav'
import { v4 } from 'uuid'
import { ClientServerSyncStore } from '../hooks/use_client_server_sync'

const as = getActionsAS()
const ss = ClientServerSyncStore.getState()

export const InitLoaded = () => {
  const {status, data} = useUserAirs()
  const isResEmpty = data?.data.length > 0

  if (data?.data && isResEmpty) {
    // try to preserve selection of last selected aircraft 
    const oldId = AirStore.getState().selectedAir?.aircraftId
    const newIdx = data.data.findIndex((a:any) => a.aircraftId === oldId)
    const airIdx = newIdx === -1 ? 0 : newIdx

    //init state of selected aircraft
    initAirCargos(data.data[airIdx])
    as.setSelectedAir(data.data[airIdx])

    // init state of server client sync
    ss.setLastSyncEpoch(data.serverEpoch)
    ss.setIsClientCacheEqualToSwRes(true)

    return <DynamicMainNav key={v4()} />
  }

  if (data && !isResEmpty) {
    return <Result title="You have no assigned aircraft" />
  }

  if (status === 'loading') {
    return (
      <div style={{padding: '12px 12px 12px 12px'}}>
        <Skeleton active paragraph={{rows: 30}} />
      </div>
    )
  }

  return (
    <Result
      status="error"
      title="Failed to load. Please check your connection"
    />
  )
}
