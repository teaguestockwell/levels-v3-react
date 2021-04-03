import {Button} from 'antd'
import {CargoStore} from '../store/cargoStore'
import {getNewCustomCargoString} from '../util'
import {PlusCircleOutlined} from '@ant-design/icons'

export const AddCustomCargo = () => {
  const [putCargoIsValid, putCargo] = CargoStore((state) => [
    state.putCargoIsValid,
    state.putCargo,
  ])

  const onAddCustomCargoClick = () => {
    const newCargo = getNewCustomCargoString()
    putCargoIsValid(false, newCargo.uuid)
    putCargo(newCargo)
  }

  return (
    <Button icon={<PlusCircleOutlined />} onClick={onAddCustomCargoClick}>
      Add Custom
    </Button>
  )
}
