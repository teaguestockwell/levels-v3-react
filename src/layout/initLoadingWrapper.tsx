import {useUser} from '../hooks/userHook'
import {AccessDenied} from '../pages/accessDenied'
import {Loading} from '../pages/loading'
import {Offline} from '../pages/offline'
import {Dashboard} from './dashboard'

export const InitLoadingWrapper = () => {
  const {status, data, hasRoles} = useUser()

  if (data && hasRoles) {
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
}
