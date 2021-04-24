import axios from 'axios'
import { getQueryString } from '../util'
//import { getQueryString } from '../util'

export const put1 = async (ep:string, obj:Record<string,any>):Promise<number> => {
  const res = await axios.put(
    process.env.REACT_APP_API_BASE_URL + ep,
    obj
    //{timeout: 2}
  )

  return res.status
}

export const delete1 = async (ep:string, obj:Record<string,any>):Promise<number> => {
  const res = await axios.delete(process.env.REACT_APP_API_BASE_URL + ep + '?' + getQueryString(obj))
  return res.status
}
