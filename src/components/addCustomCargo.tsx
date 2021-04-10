import {Button} from 'antd'
import {CargoStore, selectActionsCS} from '../hooks/cargoStore'
import {getCargoString} from '../util'
import {PlusCircleOutlined} from '@ant-design/icons'



export const AddCustomCargo = () => {
  const cs = CargoStore(selectActionsCS)

  const onAddCustomCargoClick = () => {
    const newCargo = getCargoString()
    cs.putCargosIsValid(new Map([[newCargo.uuid, false]]))
    cs.putCargos([newCargo])
  }

  return (
    <Button icon={<PlusCircleOutlined />} onClick={onAddCustomCargoClick}>
      Add Custom
    </Button>
  )
}
