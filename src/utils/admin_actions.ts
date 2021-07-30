import {message} from 'antd'
import {v4} from 'uuid'
import {adminStore} from '../hooks/admin_store'
import {getModelFromEP, getNewModelFromEP, getQueryString} from './util'
import {delete1, put1} from '../hooks/query'

const toastWrap = async (
  apiRes: Promise<any>,
  action: string,
  name: string
): Promise<boolean> => {
  const key = v4()
  message.loading({content: `${action}ing ${name}...`, key})
  const duration = 3
  try {
    const res = await apiRes

    if(res.status === 200){
      message.success({content: `${name} ${action}ed`, key, duration})
      return true
    }
    
    message.error({content: `${res.data.msg}`, key, duration})
    return false
  } catch (e){
    message.error({content: `Error, please refresh the page`, key, duration})
    return false
  }
}

export const adminActions = () => {
  const as = adminStore.getState()

  return {
    addNewRow: () => as.setEditObj(getNewModelFromEP(as.ep)),
    closeEditModal: () => as.setEditObj(undefined),
    deleteRow: (row: any) =>
      toastWrap(
        delete1(`${getModelFromEP(as.ep)}?${getQueryString(row)}`),
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
