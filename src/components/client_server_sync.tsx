/* eslint-disable @typescript-eslint/no-unused-vars */
import {Alert, Button} from 'antd'
import {v4} from 'uuid'
import {SyncOutlined} from '@ant-design/icons'
import {useClientServerSync} from '../hooks/use_client_server_sync'
import {useMemo} from 'react'
import {formatDistanceToNowStrict} from 'date-fns'
import TextLoop from 'react-text-loop'
import {queryClient} from '../utils/const'

export const ClientServerSync = () => {
  const sync = useClientServerSync()

  return useMemo(() => {
    // factor in that the text loop will display 6 secs late
    const lastSyncedFormatted = formatDistanceToNowStrict(
      new Date((sync.lastSyncEpoch as number) - 6000)
    )

    const getAlertType = () => {
      if (sync.isClientSyncedWithServer) {
        return 'success'
      } // online synced
      if (!sync.isClientCacheEqualToSwRes) {
        return 'warning'
      } // offline
      if (!sync.isClientStale) {
        return 'info'
      } // online && !isClientSyncedWithServer || lastSync > 48hrs ago
      return 'error'
    }

    const loopLength = 3000

    return (
      <Alert
        key={v4()}
        style={{
          marginTop: '-1px',
          backgroundColor: '#fff',
          border: '1px solid #d9d9d9',
          borderRadius: '2px',
          height: '32px',
          width: window.innerWidth > 750 ? '300px' : '100%',
        }}
        showIcon
        banner
        type={getAlertType()}
        message={
          <TextLoop mask interval={[loopLength, loopLength, loopLength]}>
            {sync.isClientOnline ? 'Online' : 'Offline'}
            {'last synced'}
            {`${lastSyncedFormatted} ago`}
          </TextLoop>
        }
        action={
          sync.isClientCacheEqualToSwRes ? null : (
            <Button
              size="small"
              type="primary"
              shape="circle"
              icon={<SyncOutlined />}
              onClick={() =>
                queryClient.setQueryData('userAirs', () => sync.swRes)
              }
            />
          )
        }
      />
    )
  }, [sync.swRes?.clientReqKey])
}
