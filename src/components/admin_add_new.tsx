import {Button, Row} from 'antd'
import {adminStore} from '../hooks/admin_store'
import {adminActions} from '../hooks/use_admin_polling'
import {capitalizeFirst, getModelFromEP} from '../util'

export const AdminAddNew = () => {
  const ep = adminStore((s) => s.ep)
  const model = capitalizeFirst(getModelFromEP(ep))

  return (
    <Row
      justify="end"
      style={{padding: '12px 12px 12px 12px', textAlign: 'center'}}
    >
      <Button onClick={() => adminActions().addNewRow()}>
        {`Add ${model}`}
      </Button>
    </Row>
  )
}
