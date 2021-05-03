import { Button } from "antd"
import { adminStore } from "../hooks/admin_store"
import {PlusCircleOutlined} from '@ant-design/icons'
import { adminActions } from "../hooks/use_admin_polling"
import { capitalizeFirst, getModelFromEP } from "../util"

export const AdminAddNew = () => {
  const ep = adminStore(s => s.ep)
  const model = capitalizeFirst(getModelFromEP(ep))

  return <Button onClick={() => adminActions().addNewRow()}>{`Add ${model}`}<PlusCircleOutlined />
</Button>
}