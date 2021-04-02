import {useUserAirs as useUserAirs} from '../hooks/useUserAirs'
import {AccessDenied} from '../pages/accessDenied'
import {Loading} from '../pages/loading'
import {Offline} from '../pages/offline'
import {AirStore} from '../store/airStore'
import {Dashboard} from './dashboard'

export const InitLoadingWrapper = () => {
  const {status, data, hasRoles} = useUserAirs()
  const setSelectedAir = AirStore((state) => state.setSelectedAir)

  if (data && hasRoles) {
    setSelectedAir(data.values().next().value)
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
