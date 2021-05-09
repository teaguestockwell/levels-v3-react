/* eslint-disable @typescript-eslint/no-unused-vars */
import {isEqual} from 'lodash'
import {AirStore, getActionsAS} from '../hooks/air_store'
import {useUserAirs, useUserAirsPolling} from '../hooks/use_user_airs'
import {useEffect, useState} from 'react'
import {formatDate} from '../util'
import { queryClient } from '../index'

const as = getActionsAS()

export const ClientServerSync = () => {
  const {data: clientData} = useUserAirs()
  const {data: serverData, status} = useUserAirsPolling()
  const [state, setState] = useState<{
    online: any
    previousServerLastUpdated: number
    isSynced: boolean
    serverData: any
  }>({
    online: '...',
    previousServerLastUpdated: AirStore.getState().lastUpdated as number,
    isSynced: true,
    serverData: null,
  })

  const syncState = () => {
    queryClient.setQueryData('userAirs', () => state.serverData)
  }
  useEffect(() => {
    // NOTE: during non prod builds, sw will not cache, so state will unsync 
    if (serverData) {
      const isSynced = isEqual(clientData.airs, serverData.airs)
      // is the server data coming from the sw cache? => no two lastUpdated should be the same
      const online =
        serverData.lastUpdated === state.previousServerLastUpdated
          ? false
          : true

      if (isSynced && online) {
        as.setLastUpdated(serverData.lastUpdated)
        //message.info({content: 'You are using the latest data', key})
      }

      setState({
        isSynced,
        online,
        previousServerLastUpdated: serverData.lastUpdated,
        serverData,
      })
    }
  }, [serverData?.key])

  const lastUpdated = formatDate(
    new Date(AirStore.getState().lastUpdated as number)
  )

  return (
    <>
      <div>{`last updated: ${lastUpdated} | online: ${state.online}`}</div>
      {state.isSynced ? null : <button onClick={syncState}>Sync state</button>}
    </>
  )
}
