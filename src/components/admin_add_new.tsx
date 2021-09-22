import {Button} from 'antd'
import {adminStore} from '../hooks/admin_store'
import {adminActions} from '../utils/admin_actions'
import {capitalizeFirst, getModelFromEP} from '../utils/util'

export const AdminAddNew = () => {
  const ep = adminStore((s) => s.ep)
  const model = capitalizeFirst(getModelFromEP(ep))

  return (
    <div
      style={{display: 'flex',padding: 15}}
    >
      <Button
        onClick={() => adminActions().addNewRow()}
        data-testid="admin add new"
      >
        {`Add ${model}`}
      </Button>
    </div>
  )
}
