import {Modal} from 'antd'
import {userStore, getUserActions} from '../hooks/user_store'
import {CargoForm} from './cargo_form'

const cs = getUserActions()

export const CargoEditModal = () => {
  const uuid = userStore((s) => s.editUuid)

  return (
    <Modal
      visible={uuid ? true : false}
      footer={null}
      onCancel={() => cs.setEditUuid(undefined)}
      closable={true}
      centered
    >
      {uuid ? <CargoForm uuid={uuid as string} key={uuid} /> : null}
    </Modal>
  )
}
