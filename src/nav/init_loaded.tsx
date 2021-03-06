import {useUserAirs} from '../hooks/query'
import {userStore, getUserActions} from '../hooks/user_store'
import {Result, Skeleton} from 'antd'
import { MobileNav } from './mobile_nav'
import {v4} from 'uuid'
import {Help} from '../pages/help'

const as = getUserActions()

export const InitLoaded = () => {
  // req => aircraft/deep
  // SW => cache to client
  // SW => fetches new data, and updates cache
  // fast init load, but data is stale

  const {status, data} = useUserAirs()

  if (data?.aircrafts && data.aircrafts?.length > 0) {
    // try to preserve selection of last selected aircraft
    const oldId = userStore.getState().air?.aircraftId; const newIdx = data.aircrafts.findIndex((a: any) => a.aircraftId === oldId); const airIdx = newIdx === -1 ? 0 : newIdx

    //init state of selected aircraft,  // init state of server client sync
    as.setAir(data.aircrafts[airIdx]); localStorage.setItem('lastSync', `${data.serverEpoch}`); return <MobileNav key={v4()} />
  }

  if (data && data?.aircrafts?.length <= 0) { return (
    <>
      <Result title="You have no assigned aircraft" />
      <Help />
    </>
  )}

  if (status === 'loading') {return (
      <div style={{padding: '12px 12px 12px 12px'}}>
        <Skeleton active paragraph={{rows: 30}} />
      </div>
  )}

  return (
    <>
      <Result
        status="error"
        title="Failed to load. Please check your connection"
      />
      <Help />
    </>
  )
}
