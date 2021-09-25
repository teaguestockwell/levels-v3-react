import {v4} from 'uuid'
import {AdminModal} from '../components/admin_modal'
import {JsonTable} from '../components/json_table'
import {useAir} from '../hooks/admin_store'
import {AdminNav} from '../nav/admin_nav'
import { AirSyncSelect } from '../nav/air_sync_select'

export const Admin = () => {
  // if selected air is changed, re render all
  useAir()

  return (
    <>
      <AdminNav key={v4()} />
      <AirSyncSelect type='admin' />
      <JsonTable key={v4()} />
      <AdminModal key={v4()} />
    </>
  )
}
