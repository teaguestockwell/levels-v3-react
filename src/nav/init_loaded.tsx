import {useUserAirs} from '../hooks/use_user_airs'
import {AirStore, getActionsAS, initAirCargos} from '../hooks/air_store'
import {Result, Skeleton} from 'antd'
import {DynamicMainNav} from './dynamic_main_nav'
import { v4 } from 'uuid'

const as = getActionsAS()
export const InitLoaded = () => {
  const {status, data, hasRoles} = useUserAirs()

  if (data && hasRoles) {
    const oldId = AirStore.getState().selectedAir?.aircraftId
    const newIdx = data.airs.findIndex((a:any) => a.aircraftId === oldId)
    const airIdx = newIdx === -1 ? 0 : newIdx

    initAirCargos(data.airs[airIdx])
    as.setSelectedAir(data.airs[airIdx])
    as.setLastUpdated(data.lastUpdated)

    return <DynamicMainNav key={v4()} />
  }

  if (data && !hasRoles) {
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
