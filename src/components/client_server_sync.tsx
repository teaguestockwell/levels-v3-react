/* eslint-disable @typescript-eslint/no-unused-vars */
import {queryClient} from '../const'
import {Alert, Button} from 'antd'
import { v4 } from 'uuid'
import {SyncOutlined} from '@ant-design/icons'
import TextLoop from 'react-text-loop'
import { useTick } from '../hooks/use_tick'
import { useUserServerClientSync } from '../hooks/useUserServerClientSync'
import { useMemo } from 'react'

export const ClientServerSync = () => {
  const tick = useTick(9000)
  const sync = useUserServerClientSync()
  const isMobile = window.innerWidth > 750 ? false : true


  return useMemo(() => {

    const getAlertType = () => {
      if(sync.isClientSyncedWithServer){return 'success'}
      if(!sync.isClientEqualToRes){return 'warning'}
      if(!sync.isClientStale){return 'info'}
      return 'error'
    }
    
    //invalidate initLoaded to reset app
    const syncClientAndServerState = () => queryClient.setQueryData('userAirs', () => sync.serverData.data)

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
      action={sync.isClientEqualToRes ? null :<Button size="small" type="primary" shape='circle' icon={<SyncOutlined />} onClick={syncClientAndServerState}/>}
      message={
        <TextLoop mask>
          <div>{sync.isClientOnline ? 'Online' : 'Offline'}</div>
          <div>last synced</div>
          <div>{`${sync.lastSyncedFormatted} ago`}</div>
        </TextLoop>
      }
    />
  },[tick, isMobile])
}
