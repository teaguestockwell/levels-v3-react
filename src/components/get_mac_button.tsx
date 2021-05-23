import {Button} from 'antd'
import {getUserAir} from '../hooks/user_store'
import {userStore, useCargosAreValid} from '../hooks/user_store'
import {getPerMac} from '../utils/util'

export const GetMacButton = () => {
  const isCargoValid = useCargosAreValid()
  const onClick = () => {
    const air = getUserAir()
    const cargos = Array.from(userStore.getState().cargoMap.values())

    const calculation = getPerMac(air, cargos)
    alert(JSON.stringify(calculation))
  }

  return (
    <Button disabled={!isCargoValid} onClick={onClick}>
      Show Work / Form F
    </Button>
  )
}
