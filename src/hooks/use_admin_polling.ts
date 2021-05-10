import {message} from 'antd'
import axios from 'axios'
import {useQuery} from 'react-query'
import {v4} from 'uuid'
import {
  getModelFromEP,
  getNewModelFromEP,
  getQueryString,
  removeNestedObj,
} from '../util'
import {adminStore} from './admin_store'

export const usePolling = (ep: string, refetchInterval = 2000) => {
  return useQuery(
    ep,
    async () => {
      try {
        return (await axios.get(process.env.REACT_APP_API_BASE_URL + ep)).data
      } catch (e) {
        return null
      }
    },
    {
      retry: 5,
      refetchInterval,
    }
  )
}

export const useGet1 = (ep: string) => {
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

const put1 = async (obj: any, ep: string): Promise<number> => {
  // remove all values that are an object
  const shallowObj = removeNestedObj(obj)

  // name is not a prop on config cargo because it is derived from its cargoId
  // we use name up until this point for toast
  if (ep.includes('configCargo')) {
    delete shallowObj.name
  }

  return (await axios.put(process.env.REACT_APP_API_BASE_URL + ep, shallowObj))
    .status
}

const delete1 = async (obj: any, ep: string): Promise<number> => {
  return (await axios.delete(process.env.REACT_APP_API_BASE_URL + ep)).status
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
    deleteRow: (row: any) =>
      toastWrap(
        delete1(row, getModelFromEP(as.ep) + '?' + getQueryString(row)),
        'delet',
        row.name
      ),
    openEditModal: (obj: any) => as.setEditObj(obj),
    saveEditModal: () => {
      const obj = as.editObj as any
      toastWrap(put1(obj, as.ep), 'sav', obj.name).then((ok) => {
        if (ok) {
          as.setEditObj(undefined)
        }
      })
    },
  }
}
