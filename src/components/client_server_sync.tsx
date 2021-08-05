import {Button, Modal} from 'antd'
import {SyncOutlined} from '@ant-design/icons'
import {useMemo, useState} from 'react'
import {queryClient} from '../utils/const'
import {useTick} from '../hooks/use_tick'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import {v4} from 'uuid'
import { useServerSync } from '../hooks/use_client_sync_store'

const colorMap = {
  outdated: '#FF4D50',
  updateFetching: '#FF4D12',
  updateNow: '#F9AD14',
  offline: '#1890FF',
  synced: '#52C419'
}

const getLastSyncedFromNowString = () => {
 try{
  return formatDistanceToNowStrict(
    Number(
      localStorage.getItem('lastSync')
    )
  )
 } catch(e) {
   console.error(e)
  return 'an unknown amount of time'
 }
}

export const ClientServerSync = () => {
  const [isOpen, setIsOpen] = useState(false)
  const tick = useTick(1000)
  const {state, pendingSync} = useServerSync()
  const color = colorMap[state]

  const syncButton = state !== 'updateNow' ? null : (
    <Button
      data-testid="client sync but"
      onClick={() => {queryClient.setQueryData('userAirs', () => pendingSync)}}
    >
      Sync Now
    </Button>
  )

  const modalButton = useMemo(() => {
    return (
      <Button
        data-testid={color}
        style={{backgroundColor: color, borderColor: color}}
        size={'small'}
        type="primary"
        shape="circle"
        icon={<SyncOutlined />}
        onClick={() => setIsOpen(true)}
      />
    )
  }, [color])

  return useMemo(() => {
    return (
      <>
        {isOpen ? (
          <Modal
            visible={true}
            footer={null}
            onCancel={() => setIsOpen(false)}
            closable={false}
            centered
          >
            <div key={v4()}>
              <p>{`${state}, last synced ${getLastSyncedFromNowString()} ago`}</p>
              {syncButton}
            </div>
          </Modal>
        ) : null}
        {modalButton}
      </>
    )
  }, [tick, isOpen])
}
