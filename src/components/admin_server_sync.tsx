import {Button, Modal} from 'antd'
import {useMemo, useState} from 'react'
import {v4} from 'uuid'
import {adminStore} from '../hooks/admin_store'
import {usePolling} from '../hooks/query'
import {useTick} from '../hooks/use_tick'
import {SyncOutlined} from '@ant-design/icons'

// this component dose not sync anything, it is used only for display
export const AdminServerSync = () => {
  const ep = adminStore((s) => s.ep)
  const {data, dataUpdatedAt} = usePolling(ep)
  const tick = useTick(500)
  const [isOpen, setIsOpen] = useState(false)

  const syncColor = data ? '#52C419' : '#1890FF'
  const isData = data ? true : false
  const connectedStateString = isData ? 'Online' : 'Offline'

  const modalButton = useMemo(() => {
    return <Button
    data-testid='admin-sync-button'
    style={{backgroundColor: syncColor, borderColor: syncColor}}
    size={'small'}
    type="primary"
    shape="circle"
    icon={<SyncOutlined />}
    onClick={() => setIsOpen(true)}
    />
  },[syncColor])


  return useMemo(() => {
    const diff = ((Date.now() - dataUpdatedAt) / 1000).toFixed(1)
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
            <p>{`${connectedStateString}, last synced ${diff} ago`}</p>
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
