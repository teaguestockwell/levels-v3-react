import React from 'react'
import {AdminAddNew} from '../components/admin_add_new'
import {v4} from 'uuid'
import {AdminAirSelect} from '../components/admin_air_select'
import {AdminModal} from '../components/admin_modal'
import {JsonTable} from '../components/json_table'
import {useAir} from '../hooks/admin_store'
import {AdminNav} from '../nav/admin_nav'
export const Admin = () => {
  // if selected air is changed, re render all
  useAir()
  return (
    <>
      <AdminAirSelect key={v4()} />
      <AdminAddNew />
      <AdminNav key={v4()} />
      <JsonTable key={v4()} />
      <AdminModal key={v4()} />
    </>
  )
}
