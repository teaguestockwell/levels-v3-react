import {Button} from 'antd'
import {getAir} from '../hooks/user_store'
import {userStore, useValidation} from '../hooks/user_store'
import {getPerMac} from '../utils/util'

export const GetMacButton = () => {
  const isCargoValid = useValidation()
  const onClick = () => {
    const air = getAir()
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
