import {Button} from 'antd'
import {getActionsCS} from '../hooks/cargo_store'
import {getCargoString} from '../util'
import {PlusCircleOutlined} from '@ant-design/icons'

const cs = getActionsCS()

export const AddCustomCargo = () => {
  const onAddCustomCargoClick = () => {
    const newCargo = getCargoString()
    cs.putCargos([newCargo])
  }

  return (
    <Button onClick={onAddCustomCargoClick}>
      Add Custom
      <PlusCircleOutlined />
    </Button>
  )
}
