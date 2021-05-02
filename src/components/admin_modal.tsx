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

  console.log(isOpen)

  const form = useMemo(() => {
    return isOpen ? (
      <Modal
        visible={true}
        footer={null}
        onCancel={() => adminActions().closeEditModal()}
        centered
        closable={false}
      >
        <AdminForm />
      </Modal>
    ) : null
  }, [isOpen])

  return form
}
