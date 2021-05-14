import {message} from 'antd'
import {v4} from 'uuid'
import {adminStore} from '../hooks/admin_store'
import {
  getModelFromEP,
  getNewModelFromEP,
  getQueryString,
} from './util'
import { delete1, put1 } from '../hooks/query'


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
