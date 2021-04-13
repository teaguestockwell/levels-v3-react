import {useUserAirs} from '../hooks/UseUserAirs'
import {AccessDenied} from '../pages/AccessDenied'
import {Loading} from '../pages/Loading'
import {Offline} from '../pages/Offline'
import {getActionsAS} from '../hooks/AirStore'
import {getCargoSchema} from '../util'
import {Dashboard} from './Dashboard'

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
