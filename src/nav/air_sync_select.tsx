/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import {AdminAirSelect} from '../components/admin_air_select'
import {ClientServerSync} from '../components/client_server_sync'
import {UserAirSelect} from '../components/user_air_select'
import {AdminServerSync} from '../components/admin_server_sync'

const sync = {
  admin: <AdminServerSync />,
  user: <ClientServerSync />,
  test: <div></div>
}

const select = {
  admin: <AdminAirSelect />,
  user: <UserAirSelect />,
  test: <div></div>
}

export const AirSyncSelect = React.memo(({
  type,
  style = {}
}: {
  type: 'user' | 'admin' | 'test'
  style?: React.CSSProperties
}) => {
  // admin app bars contain AdminAirSelects that sync client and server state automatically
  // user app bars contain UserAirSelects that use init state of service worker cache.
  // the cache is updated by the ClientServerSync. if initState !== currentState the users may opt in to refresh
  return <>
    {
      sync[type]
    }
      <div
        data-testid='air-sync-select'
        style={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          background: '#fff',
          height: 50,
          ...style
        }}
        >
      {
        select[type]
      }

    </div>

    </>
}, (s0,s1) => s0.type === s1.type)
