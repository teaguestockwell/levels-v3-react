import {Button} from 'antd'
import {CargoStore} from '../hooks/cargoStore'
import {getCargoString} from '../util'
import {PlusCircleOutlined} from '@ant-design/icons'

export const AddCustomCargo = () => {
  const [putCargosIsValid, putCargos] = CargoStore((state) => [
    state.putCargosIsValid,
    state.putCargos,
  ])

  const onAddCustomCargoClick = () => {
    const newCargo = getCargoString()
    putCargosIsValid(new Map([[newCargo.uuid, false]]))
    putCargos([newCargo])
  }

  return (
    <Button icon={<PlusCircleOutlined />} onClick={onAddCustomCargoClick}>
      Add Custom
    </Button>
  )
}
