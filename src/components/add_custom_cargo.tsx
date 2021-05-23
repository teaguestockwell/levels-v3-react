import {Button} from 'antd'
import {getUserActions} from '../hooks/user_store'
import {getCargoString} from '../utils/util'

const cs = getUserActions()

export const AddCustomCargo = () => {
  const onAddCustomCargoClick = () => {
    const newCargo = getCargoString()
    cs.putCargos([newCargo])
  }

  return <Button onClick={onAddCustomCargoClick} data-testid='user add new'>Add Custom</Button>
}
