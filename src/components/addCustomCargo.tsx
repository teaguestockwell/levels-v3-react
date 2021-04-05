import {Button} from 'antd'
import {CargoStore} from '../store/cargoStore'
import {getNewCustomCargoString} from '../util'
import {PlusCircleOutlined} from '@ant-design/icons'

export const AddCustomCargo = () => {
  const [putCargosIsValid, putCargos] = CargoStore((state) => [
    state.putCargosIsValid,
    state.putCargos,
  ])

  const onAddCustomCargoClick = () => {
    const newCargo = getNewCustomCargoString()
    putCargosIsValid(new Map([[newCargo.uuid, false]]))
    putCargos([newCargo])
  }

  return (
    <Button icon={<PlusCircleOutlined />} onClick={onAddCustomCargoClick}>
      Add Custom
    </Button>
  )
}
