import {useUser} from '../hooks/userHook'
import {AccessDenied} from '../pages/accessDenied'
import {Loading} from '../pages/loading'
import {Offline} from '../pages/offline'
import {Dashboard} from './dashboard'

export const InitLoadingWrapper = () => {
  const {status, data: airMap } = useUser()

  if (airMap && airMap.size > 0) {
    return <Dashboard airMap={airMap}/>
  }
  if (airMap && airMap.size) {
    return <AccessDenied />
  }
  if (status === 'loading') {
    return <Loading />
  }
  if (status === 'error') {
    return <Offline />
  }
  return (<div>Unhandled State</div>)
}
