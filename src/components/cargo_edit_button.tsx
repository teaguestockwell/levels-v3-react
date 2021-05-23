import {CheckCircleFilled, CloseCircleFilled} from '@ant-design/icons'
import {getUserActions, useCargo} from '../hooks/user_store'
import {Button} from 'antd'

const cs = getUserActions()

export const CargoEditButton = ({uuid}: {uuid: string}) => {
  const cargo = useCargo(uuid)

  const icon = cargo.isValid ? (
    <CheckCircleFilled style={{color: '#52C41B'}} />
  ) : (
    <CloseCircleFilled style={{color: '#FF4D4F'}} />
  )

  return (
    <Button icon={icon} onClick={() => cs.setEditUuid(uuid)}>
      {`${cargo.qty} EA ${cargo.name}`}
    </Button>
  )
}
