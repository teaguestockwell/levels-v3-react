import {useUserAirs} from '../hooks/use_user_airs'
import {AccessDenied} from '../pages/access_denied'
import {Loading} from '../pages/loading'
import {Offline} from '../pages/offline'
import {getActionsAS} from '../hooks/air_store'
import {getCargoSchema} from '../util'
import {Dashboard} from './dashboard'

export const InitLoadingWrapper = () => {
  const {status, data, hasRoles} = useUserAirs()

  if (data && hasRoles) {
    const initAir = data.values().next().value
    const as = getActionsAS()
    as.setSelectedAir(initAir)
    as.setCargoSchema(getCargoSchema(initAir))
    return <Dashboard />
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
