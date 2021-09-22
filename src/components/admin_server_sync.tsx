import { Modal} from 'antd'
import {useMemo, useState} from 'react'
import {v4} from 'uuid'
import {adminStore} from '../hooks/admin_store'
import {usePolling} from '../hooks/query'
import {useTick} from '../hooks/use_tick'
import { svgs } from './icons'

// this component dose not sync anything, it is used only for display
export const AdminServerSync = () => {
  const ep = adminStore((s) => s.ep)
  const {data, dataUpdatedAt} = usePolling(ep)
  const tick = useTick(500)
  const [isOpen, setIsOpen] = useState(false)
  const isData = data ? true : false
  const connectedStateString = isData ? 'Online' : 'Offline'

  const w = 24
  const h = 24

  const displayButton = useMemo(() => {
    return <div
    onClick={() => setIsOpen(!isOpen)}
      style={{
        zIndex: 10,
        background: '#F1F1F1',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 40,
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {
        data ? <svgs.CloudDone w={w} h={h} color={'#52C419'}/> :
        <svgs.Cloud w={w} h={h} color={'#1890FF'}/>
      }
      <div style={{marginLeft: 10, textTransform: 'capitalize'}}>{data ? 'Online' : 'Offline' }</div>
    </div>
  }, [isData])

  return useMemo(() => {
    const diff = ((Date.now() - dataUpdatedAt) / 1000).toFixed(1)
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
              <p>{`${connectedStateString}, last synced ${diff} ago`}</p>
            </div>
          </Modal>
        ) : null}
        {displayButton}
      </>
    )
  }, [tick, isOpen])
}
