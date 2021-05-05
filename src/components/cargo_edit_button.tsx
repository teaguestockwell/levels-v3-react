import React from 'react'
import {CheckCircleFilled, CloseCircleFilled} from '@ant-design/icons'
import {getActionsCS, useCargo} from '../hooks/cargo_store'
import {Button} from 'antd'

const cs = getActionsCS()

export const CargoEditButton = ({uuid}: {uuid: string}) => {
  const cargo = useCargo(uuid)

  const icon = cargo.isValid ? (
    <CheckCircleFilled style={{color: '#52C41B'}} />
  ) : (
    <CloseCircleFilled style={{color: '#FF4D4F'}} />
  )

  return (
    <Button icon={icon} onClick={() => cs.putEditUuid(uuid)}>
      {`${cargo.qty} EA ${cargo.name}`}
    </Button>
  )
}
