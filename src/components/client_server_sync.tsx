/* eslint-disable @typescript-eslint/no-unused-vars */
import {Alert, Button} from 'antd'
import { v4 } from 'uuid'
import {SyncOutlined} from '@ant-design/icons'
import { useTick } from '../hooks/use_tick'
import { useClientServerSync } from '../hooks/use_client_server_sync'
import { useMemo } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'
import TextLoop from 'react-text-loop'
import {queryClient} from '../utils/const'

export const ClientServerSync = () => {
  const tick = useTick(9000)
  const sync = useClientServerSync()

  return useMemo(() => {

    // factor in that the text loop will display 6 secs late
    const lastSyncedFormatted = formatDistanceToNowStrict(
      new Date(
        (sync.lastSyncEpoch as number) - 6000
      )
    )

    const getAlertType = () => {
      if(sync.isClientSyncedWithServer){return 'success'} // online synced
      if(!sync.isClientCacheEqualToSwRes){return 'warning'} // offline
      if(!sync.isClientStale){return 'info'} // online && !isClientSyncedWithServer || lastSync > 48hrs ago
      return 'error'
    }
    
    return <Alert
      key={v4()}
      style={{
        marginTop: '-1px',
        backgroundColor: '#fff',
        border: '1px solid #d9d9d9',
        borderRadius: '2px',
        height: '32px',
        width: window.innerWidth > 750 ? '300px' : '100%'
      }}
      showIcon
      banner
      type={getAlertType()}
      message={
        <TextLoop mask>
          <div>{sync.isClientOnline ? 'Online' : 'Offline'}</div>
          <div>last synced</div>
          <div>{`${lastSyncedFormatted} ago`}</div>
        </TextLoop>
      }
      action={
        sync.isClientCacheEqualToSwRes ?
         null 
        : <Button 
         size="small"
         type="primary"
         shape='circle'
         icon={<SyncOutlined />}
         onClick={() => queryClient.setQueryData('userAirs', () => sync.serverData)}
        />
      }
    />
  },[tick])
}
