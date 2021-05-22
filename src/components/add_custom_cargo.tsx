import {Button} from 'antd'
import {getActionsCS} from '../hooks/cargo_store'
import {getCargoString} from '../utils/util'

const cs = getActionsCS()

export const AddCustomCargo = () => {
  const onAddCustomCargoClick = () => {
    const newCargo = getCargoString()
    cs.putCargos([newCargo])
  }

  return <Button onClick={onAddCustomCargoClick} data-testid='user add new'>Add Custom</Button>
}
