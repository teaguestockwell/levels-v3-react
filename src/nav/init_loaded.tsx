import {useUserAirs} from '../hooks/use_user_airs'
import {getActionsAS, initAirCargos} from '../hooks/air_store'
import {MobileNav} from './mobile_nav'
import {Result, Skeleton} from 'antd'

const as = getActionsAS()
export const InitLoaded = () => {
  const {status, data, hasRoles} = useUserAirs()

  if (data && hasRoles) {
    initAirCargos(data.airs[0])
    as.setSelectedAir(data.airs[0])
    as.setLastUpdated(data.lastUpdated)
    return <MobileNav />
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
