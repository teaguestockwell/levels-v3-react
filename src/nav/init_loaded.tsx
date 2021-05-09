import {useUserAirs} from '../hooks/use_user_airs'
import {AccessDenied} from '../pages/access_denied'
import {Loading} from '../pages/loading'
import {Offline} from '../pages/offline'
import {getActionsAS} from '../hooks/air_store'
import {SideNav} from './side_nav'

const as = getActionsAS()
export const InitLoaded = () => {
  const {status, data, hasRoles} = useUserAirs()

  if (data && hasRoles) {
    as.setSelectedAir(data.airs[0])
    as.setLastUpdated(data.lastUpdated)
    return <SideNav />
  }

  if (data && !hasRoles) {
    return <AccessDenied />
  }
  if (status === 'loading') {
    return <Loading />
  }
  if (status === 'error') {
    return <Offline />
  }
  return <div>Unhandled State</div>
}
