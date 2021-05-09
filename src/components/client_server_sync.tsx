/* eslint-disable @typescript-eslint/no-unused-vars */
import { isEqual } from "lodash"
import { AirStore, getActionsAS } from "../hooks/air_store"
import { useUserAirs, useUserAirsPolling } from "../hooks/use_user_airs"
import {message} from 'antd'
import { queryClient } from "../index"
import { v4 } from 'uuid' 
import { useEffect, useState } from "react"
import { formatDate } from "../util"

const as = getActionsAS()

export const ClientServerSync = () => {
  const {data: clientData} = useUserAirs()
  const {data: serverData, status} = useUserAirsPolling()
  const [state, setState] = useState<{
    online: boolean | undefined,
    previousServerLastUpdated: number ,
    isSynced:boolean,
    serverData: any
  }>(
    {
      online: undefined,
      previousServerLastUpdated: AirStore.getState().lastUpdated as number,
      isSynced: true,
      serverData: null
    }
  )

  const syncState = () => {
    queryClient.setQueryData('userAirs', () => state.serverData)
  }
    useEffect(() => {
      if(serverData && (status === 'success') || (status === 'error')){
        const key = v4()
    
        const isSynced = isEqual(clientData.airs,serverData.airs)
        // is the server data coming from the sw cache? => no two lastUpdated should be the same
        const online = serverData.lastUpdated === state.previousServerLastUpdated ? false : true
        
        if(!online){
          message.info({content: 'You are using the app offline', key})
        }

        if(isSynced && online){
          as.setLastUpdated(serverData.lastUpdated)
          message.info({content: 'You are using the latest data', key})
        }

        if(!isSynced && online){
          message.info({content: 'Please sync', key})
        }

        setState({
          isSynced,
          online,
          previousServerLastUpdated: serverData.lastUpdated,
          serverData
        })
      }
  },[serverData])

  const lastUpdated = formatDate(new Date(
    AirStore.getState().lastUpdated as number
  ))
  
  return <>
      <div>{`last updated: ${lastUpdated} | online: ${state.online}`}</div> 
      {state.isSynced  ? null :<button onClick={syncState}>Sync state</button>}
  </>

}