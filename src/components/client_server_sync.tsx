/* eslint-disable @typescript-eslint/no-unused-vars */
import {isEqual} from 'lodash'
import {useUserAirs, useUserAirsPolling} from '../hooks/use_user_airs'
import {useEffect, useMemo, useState} from 'react'
import {queryClient} from '../const'
import {Alert, Button} from 'antd'
import { formatDistanceToNowStrict } from 'date-fns'
import { v4 } from 'uuid'
import {SyncOutlined} from '@ant-design/icons'
import TextLoop from 'react-text-loop'
import { ClientServerSyncStore, getActionsClientSyncStore, getActionsClientSyncStore, getActionsClientSyncStore, getActionsClientSyncStore } from '../hooks/client_server_sync_store'

const ss = getActionsClientSyncStore()

export const ClientServerSync = () => {
  const { data: clientData } = useUserAirs()
  const { data: serverData } = useUserAirsPolling()
  const [ tick, setTick ] = useState(Date.now())

  // start a clock to schedule updates to TextLoop,
  // since there are 3 rows @ 3s ea, update once every 9s
  useEffect(() => {
    // tick every 9 seconds to allow spinner to  cycle
    const ticker = setTimeout(() => setTick(() => Date.now()), 9000)
    return () => clearTimeout(ticker)
  }, [tick])

  // every time there is a new res
  useEffect(() => {
    const s = ClientServerSyncStore.getState()

    // fallback if service worker does not return cache
    if (!serverData) {
   
      ss.set
      // s.setState({
      //   lastSyncTimeStamp: s.state.lastSyncTimeStamp,
      //   isClientEqualToRes: true,
      //   isClientOnline: false,
      //   previousServerTimeStamp: s.state.previousServerTimeStamp,
      // })
    }

    if (serverData) {
      // are the preloaded aircraft stale?
      const isClientEqualToRes = isEqual(clientData.airs, serverData.airs)

      // if server timeStamp1 === timestamp2, res is from service worker cache
      const isClientOnline = serverData.lastUpdated !== s.state.previousServerTimeStamp

      // client res equality does not mean client is synced with server because the res could have been cached 
      const isClientSyncedWithServer = s.state.isClientEqualToRes && s.state.isClientOnline

      s.setState({
        lastSyncTimeStamp: isClientSyncedWithServer ? serverData.lastUpdated : s.state.lastSyncTimeStamp,
        isClientEqualToRes,
        isClientOnline,
        previousServerTimeStamp: serverData.lastUpdated,
      })
    }
    // key is unique to each res regardless is it is from service worker cache
  }, [serverData?.key])

  
  return useMemo(() => {
    const s = ClientServerSyncStore.getState()
    console.log(s.state.lastSyncTimeStamp)

    // was the client synced with the server over 48 hours ago?
    const isClientStale = Date.now() - (s.state.lastSyncTimeStamp as number) > 172800000 

    // factor in that the text loop will display 6 secs late
    const lastSyncedFormatted = formatDistanceToNowStrict(new Date((s.state.lastSyncTimeStamp as number) - 6000))

    // client res equality does not mean client is synced with server because the res could have been cached 
    const isClientSyncedWithServer = s.state.isClientEqualToRes && s.state.isClientOnline

    const getAlertType = () => {
      if(isClientSyncedWithServer){return 'success'}
      if(!s.state.isClientEqualToRes){return 'warning'}
      if(!isClientStale){return 'info'}
      return 'error'
    }
    
    //invalidate initLoaded to reset app
    const syncClientAndServerState = () => queryClient.setQueryData('userAirs', () => serverData.data)

    console.log(lastSyncedFormatted)

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
      action={s.state.isClientEqualToRes ? null :<Button size="small" type="primary" shape='circle' icon={<SyncOutlined />} onClick={syncClientAndServerState}/>}
      message={
        <TextLoop mask>
          <div>{s.state.isClientOnline ? 'Online' : 'Offline'}</div>
          <div>last synced</div>
          <div>{`${lastSyncedFormatted} ago`}</div>
        </TextLoop>
      }
    />
  },[tick])
}
