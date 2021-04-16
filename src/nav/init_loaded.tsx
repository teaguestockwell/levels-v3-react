import {useUserAirs} from '../hooks/use_user_airs'
import {AccessDenied} from '../pages/access_denied'
import {Loading} from '../pages/loading'
import {Offline} from '../pages/offline'
import {getActionsAS} from '../hooks/air_store'
import {SideNav} from './side_nav'

export const InitLoaded = () => {
  const {
    status,
    data,
    hasRoles
  } = useUserAirs()

  if (data && hasRoles) {
    const initAir = data.values().next().value
    getActionsAS().setSelectedAir(initAir)
    return <SideNav />
  }
  
  if (data && !hasRoles) {return <AccessDenied />}
  if (status === 'loading') {return <Loading />}
  if (status === 'error') {return <Offline />}
  return <div>Unhandled State</div>
}