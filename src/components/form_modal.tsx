import {Button, Modal} from 'antd'
import {useCargo} from '../hooks/cargo_store'
import {CheckCircleFilled, CloseCircleFilled} from '@ant-design/icons'
import {CargoForm} from './cargo_form'
import {useState} from 'react'

const CustomButton = ({uuid, onClick}: {uuid: string; onClick: () => void}) => {
  const cargo = useCargo(uuid)

  const icon = cargo.isValid ? (
    <CheckCircleFilled style={{color: '#52C41B'}} />
  ) : (
    <CloseCircleFilled style={{color: '#FF4D4F'}} />
  )
  const text = `${cargo.qty} EA ${cargo.name}`

  return (
    <Button icon={icon} onClick={onClick}>
      {text}
    </Button>
  )
}

const CustomModal = ({
  uuid,
  onCancel,
  isOpen,
}: {
  uuid: string
  onCancel: () => void
  isOpen: boolean
}) => {
  return (
    <Modal
      visible={isOpen}
      footer={null}
      onCancel={onCancel}
      centered
      closable={false}
    >
      <CargoForm uuid={uuid} />
    </Modal>
  )
}

export const FormModal = ({uuid}: {uuid: string}) => {
  const [isOpen, setIsOpen] = useState(false)

  const onClick = () => setIsOpen(!isOpen)

  return (
    <>
      <CustomButton uuid={uuid} onClick={onClick} />
      <CustomModal uuid={uuid} onCancel={onClick} isOpen={isOpen} />
    </>
  )
}
