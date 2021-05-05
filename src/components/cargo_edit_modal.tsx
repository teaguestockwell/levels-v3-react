import React from 'react'
import {Modal} from 'antd'
import {CargoStore, getActionsCS} from '../hooks/cargo_store'
import {CargoForm} from './cargo_form'

const cs = getActionsCS()

export const CargoEditModal = () => {
  const uuid = CargoStore((s) => s.editUuid)

  return (
    <Modal
      visible={uuid ? true : false}
      footer={null}
      onCancel={() => cs.putEditUuid(undefined)}
      closable={false}
      centered
    >
      {uuid ? <CargoForm uuid={uuid as string} key={uuid} /> : null}
    </Modal>
  )
}
