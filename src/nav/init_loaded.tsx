import {useUserAirs} from '../hooks/query'
import {userStore, getUserActions} from '../hooks/user_store'
import {Result, Skeleton} from 'antd'
import {DynamicMainNav} from './dynamic_main_nav'
import {v4} from 'uuid'
import {Help} from '../pages/help'

const as = getUserActions()

export const InitLoaded = () => {
  // req => lastUpdated
  // SW => cache to client
  // SW => fetches new data, and updates cache
  // fast init load, but data is stale

  const {status, data} = useUserAirs()

  if (data?.data && data?.data.length > 0) {
    // try to preserve selection of last selected aircraft
    const oldId = userStore.getState().air?.aircraftId
    const newIdx = data.data.findIndex((a: any) => a.aircraftId === oldId)
    const airIdx = newIdx === -1 ? 0 : newIdx

    //init state of selected aircraft
    as.setAir(data.data[airIdx])

    // init state of server client sync
    localStorage.setItem('lastSynced', `${data.data.serverEpoch}`)


    return <DynamicMainNav key={v4()} />
  }

  if (data && data?.data.length <= 0) {
    return (
      <>
        <Result title="You have no assigned aircraft" />
        <Help />
      </>
    )
  }

  if (status === 'loading') {
    return (
      <div style={{padding: '12px 12px 12px 12px'}}>
        <Skeleton active paragraph={{rows: 30}} />
      </div>
    )
  }

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
