import {getAir} from '../hooks/air_store'
import {useCargos} from '../hooks/cargo_store'
import {getPerMac} from '../utils/util'

export const PerMac = () => {
  const cargos = useCargos()

  if (cargos.every((c) => c.isValid)) {
    return <h1>{getPerMac(getAir(), cargos).percentMacPercent}</h1>
  }

  return <h1>Invalid</h1>
}
