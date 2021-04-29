import { Button } from "antd"
import { v4 } from "uuid"
import { AdminAirSelect } from "../components/admin_air_select"
import { AdminModal } from "../components/admin_modal"
import { JsonTable } from "../components/json_table"
import {adminStore, useAir} from "../hooks/admin_store"
import { adminActions } from "../hooks/use_admin_polling"
import { AdminNav as JsonTableSheetNav } from "../nav/json_table_sheet_nav"

const AdminLogger = () => {
  const store  = adminStore()
  console.log(store)
  return <div></div>
}

export const Admin = () => {
  // if selected air is changed, re render all
  useAir()
  return <>
    <AdminLogger/>
    <AdminAirSelect key={v4()}/>
    <Button key={v4()} onClick={() => adminActions().addNewRow()}>Add New</Button>
    <JsonTableSheetNav key={v4()}/>
    <JsonTable key={v4()}/>
    <AdminModal key={v4()}/>
  </>
}
