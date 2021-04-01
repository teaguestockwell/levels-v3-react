import {useUser} from '../hooks/userHook'
import {AccessDenied} from '../pages/accessDenied'
import {Loading} from '../pages/loading'
import {Offline} from '../pages/offline'
import {AirStore} from '../store/aircraftStore'
import {Dashboard} from './dashboard'

export const InitLoadingWrapper = () => {
  const {status, data, hasRoles} = useUser()
  const setSelectedAir = AirStore((state) => state.setSelectedAir)

  if (data && hasRoles) {
    setSelectedAir(data.values().next().value)
    return <Dashboard airMap={data} />
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
