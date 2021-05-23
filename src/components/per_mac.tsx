import { isEqual } from 'lodash'
import {getAir, userStore} from '../hooks/user_store'
import {getPerMac} from '../utils/util'

export const PerMac = () => {
  const cargos = userStore(
    (s) => Array.from(s.cargoMap.values()),
    (s1, s2) => isEqual(s1, s2)
  )

  if (cargos.every((c) => c.isValid)) {
    return <h1>{getPerMac(getAir(), cargos).percentMacPercent}</h1>
  }

  return <h1>Invalid</h1>
}
