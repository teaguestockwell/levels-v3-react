import {Modal} from 'antd'
//import { isEqual } from 'lodash'
import {useMemo} from 'react'
import {adminStore} from '../hooks/admin_store'
import {adminActions} from '../hooks/use_admin_polling'
import {AdminForm} from './admin_form'

export const AdminModal = () => {
  const isOpen = adminStore(
    (s) => (s.editObj ? true : false),
    (s0, s1) => s0 && s1
  )
  console.log('admin modal rendered as: ' + isOpen)

  const form = useMemo(() => {
    const as = adminStore.getState()
    return isOpen ? (
      <Modal
        visible={true}
        footer={null}
        onCancel={() => adminActions().closeEditModal()}
        centered
        closable={false}
      >
        <AdminForm obj={as.editObj} ep={as.ep} />
      </Modal>
    ) : null
  }, [isOpen])

  return form
}
