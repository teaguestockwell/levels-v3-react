import { message } from 'antd'
import axios from 'axios'
import {useQuery} from 'react-query'
import { v4 } from 'uuid'
import { getModelFromEP, getNewModelFromEP, getQueryString } from '../util'
import { adminStore } from './admin_store'

export const UsePollingAtEP = (ep: string, refetchInterval = 2000) => {
  return useQuery(
    ep,
    async () => {
      return (await axios.get(process.env.REACT_APP_API_BASE_URL + ep)).data
    },
    {
      retry: 5,
      refetchInterval,
    }
  )
}

export const useGet1 = (ep:string) => {
  return useQuery(
    ep,
    async () => {
      return (await axios.get(process.env.REACT_APP_API_BASE_URL + ep)).data
    },
    {
      retry: 5,
    }
  )
}

const put1 = async (obj:any,ep:string): Promise<number> => {
  return (await axios.put(
    process.env.REACT_APP_API_BASE_URL + ep,
    obj
  )).status
}

const delete1 = async (obj:any, ep:string): Promise<number> => {
  return (await axios.delete(
    process.env.REACT_APP_API_BASE_URL + ep
  )).status
}

const toastWrap = async (
  apiRes: Promise<number>,
  action: string,
  name: string
): Promise<boolean> => {
  const key = v4()
  let success = false

  message.loading({content: `${action}ing ${name}...`, key})
  try {
    await apiRes
    message.success({content: `${name} ${action}ed`, key, duration: 5})
    success = true
  } catch (e) {
    message.error({content: `${e}`, key, duration: 3})
  }
  return success
}


export const adminActions = () => {
  const as = adminStore.getState()

  return {
    addNewRow: () => as.setEditObj(getNewModelFromEP(as.ep)),
    closeEditModal: () => as.setEditObj(undefined),
    deleteRow: (row:any) => toastWrap(
      delete1(
         row, getModelFromEP(as.ep) + '?' + getQueryString(row)
      ),
      'Delet',
      row.name
    ),
    openEditModal: (obj:any) => as.setEditObj(obj),
    saveEditModal: (obj:any) => {
      toastWrap(put1(obj,as.ep), 'edit', obj.name)
      .then(ok => {
        if(ok){
          as.setEditObj(undefined)
        }
      })
    }
  }
}
