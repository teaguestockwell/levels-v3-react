/* eslint-disable @typescript-eslint/no-unused-vars */
import {Button, Modal} from 'antd'
import {SyncOutlined} from '@ant-design/icons'
import {useClientServerSync} from '../hooks/use_client_server_sync'
import {useMemo, useState} from 'react'
import {queryClient} from '../utils/const'
import { useTick } from '../hooks/use_tick'
import { formatDistanceToNowStrict } from 'date-fns'
import { v4 } from 'uuid'

export const ClientServerSync = () => {
  const [isOpen, setIsOpen] = useState(false)
  const sync = useClientServerSync()
  const tick = useTick(1000)
  
  const onSync = () => {
    if(sync.isClientCacheEqualToSwRes){return}
    queryClient.setQueryData('userAirs', () => sync.swRes)
  }
  
  const getSyncStateColor = () => {
    if (sync.isClientSyncedWithServer) {
      return '#52C419'
    } // online synced
    if (sync.isClientCacheEqualToSwRes) {
      return '#1890FF'
    } // offline
    if (!sync.isClientStale) {
      return '#F9AD14'
    } // online && !isClientSyncedWithServer || lastSync > 48hrs ago
    return '#FF4D50'
  }
  
  const syncColor = getSyncStateColor()
  
  
  const modalButton = useMemo(() => {
    return <Button
    style={{marginRight: '12px', backgroundColor: syncColor, borderColor: syncColor}}
    type="primary"
    shape="circle"
    icon={<SyncOutlined />}
    onClick={() => setIsOpen(true)}
    />
  },[syncColor])
  
  
  return useMemo(() => {
    const lastSyncedFromNow = formatDistanceToNowStrict(new Date(sync.lastSyncEpoch as number))
    return <>
    {
      isOpen ? 
        <Modal
          visible={true}
          footer={null}
          onCancel={() => setIsOpen(false)}
          closable={false}
          centered
        >
          <div key={v4()}>
            <p>{`${sync.isClientOnline ? 'Online' : 'Offline'}, last synced ${lastSyncedFromNow} ago`}</p>
            {
              sync.isClientCacheEqualToSwRes ? null : <Button onClick={onSync}>Sync Now</Button>
            }
          </div>
        </Modal>
        : null
    }
    {
      modalButton
    }
  </>
  },[tick,isOpen])
}
