import {Button, Modal} from 'antd'
import { svgs } from './icons'
import {useMemo, useState, useRef} from 'react'
import {useTick} from '../hooks/use_tick'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import {v4} from 'uuid'
import  * as Types from '../types'
import { UseOfflineCache } from '../hooks/use_offline_cache'

const w = 24
const h = 24
const iconMap: Record<Types.OfflineCacheState ,JSX.Element> = {
  [Types.OfflineCacheState.OUTDATED]:  <svgs.CloudOff w={w} h={h} color={'#FF4D50'}/>,
  [Types.OfflineCacheState.FETCHING]: <svgs.CloudDown w={w} h={h} color={'#FF6D12'}/>, 
  [Types.OfflineCacheState.UPDATABLE]: <svgs.Sync w={w} h={h} color={'#F8aD14'}/>,
  [Types.OfflineCacheState.OFFLINE]: <svgs.Cloud w={w} h={h} color={'#1890FF'}/>, 
  [Types.OfflineCacheState.SYNCED]: <svgs.CloudDone w={w} h={h} color={'#06BA7F'}/>
}

const getLastSyncedFromNowString = () => {
 try{
  return formatDistanceToNowStrict(
    Number(
      localStorage.getItem('lastSync')
    )
  )
 } catch(e) {
  return 'an unknown amount of time'
 }
}

export const ClientServerSync = () => {
  const [isOpen, setIsOpen] = useState(false)
  useTick(1000)
  const {stateSelector, pollComponent, syncNow} = useRef(UseOfflineCache()).current
  const state = stateSelector()

  const syncButton = state !== Types.OfflineCacheState.UPDATABLE ? null : (
    <Button
      data-testid="client sync but"
      onClick={syncNow}
    >
      Sync Now
    </Button>
  )

  const displayButton = useMemo(() => {
    return <div
    onClick={() => setIsOpen(!isOpen)}
      style={{
        zIndex: 10,
        backgroundColor: 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
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
      {iconMap[state]}
      <div style={{marginLeft: 10, textTransform: 'capitalize'}}>{state}</div>
    </div>
  }, [state])

    return (
      <>
        {pollComponent}
        {isOpen ? (
          <Modal
            visible={true}
            footer={null}
            onCancel={() => setIsOpen(false)}
            closable={true}
            centered
          >
            <div key={v4()}>
              <p>{`${state}, last synced ${getLastSyncedFromNowString()} ago`}</p>
              {syncButton}
            </div>
          </Modal>
        ) : null}
        {displayButton}
      </>
    )
}
