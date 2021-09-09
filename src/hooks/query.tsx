import { message } from 'antd'
import axios from 'axios'
import {useQuery} from 'react-query'
import {v4} from 'uuid'
import {removeNestedObj} from '../utils/util'


const baseURL = (() => {
  const url = window.location.href ?? ''
  if(url.includes('apps.dso.mil')){return process.env.REACT_APP_API_BASE_URL_PROD}
  if(url.includes('staging')){return process.env.REACT_APP_API_BASE_URL_STAGING}
  return process.env.REACT_APP_API_BASE_URL_LOCAL
})()

const unRegisterSW = async () => {
  try{
    const registrations = await navigator.serviceWorker.getRegistrations()

    for(const registration of registrations) {
      await registration.unregister()
    }
     
    return
  }catch (e){
    throw new Error('Service worker un registration failed')
  }
}

const promptUserToReload = () => {
  message.info({
    key: 'refresh-cookie',
    duration: 0,
    icon: <></>,
    style: {},
    content: <div>
      <span onClick={ async () => {
        await unRegisterSW()
        location.reload()
      }} 
        style={{color: 'blue', cursor: 'pointer'}}>
        {'Re-login'}
      </span> 
      {' to get the latest data and reset.'}
      <span onClick={() => {message.destroy('refresh-cookie')}} style={{color: 'red', cursor: 'pointer'}}>
        {' Hide'}
      </span>
    </div>,
  })
}

export const getN = async (url: string) => {
  return axios({
    baseURL,
    url,
    method: 'get',
    timeout: 10 * 1000,
    validateStatus: (status) => (status >= 200 && status < 300)
  })
    .then(res => res.data ?? {})
    .catch(() => {
      if(navigator.onLine){
        promptUserToReload()
      }
      return {}
    })
}

// https://github.com/axios/axios/issues/41
// We would like axios to use error responses as valid so we can display the api's error
const validateStatus = (status: number) => status >= 200 && status < 500

export const put1 = async (obj: any, ep: string): Promise<any> => {
  // remove all values that are an object
  const shallowObj = removeNestedObj(obj)

  // name is not a prop on config cargo because it is derived from its cargoId
  // we use name up until this point for toast
  if (ep.includes('configCargo')) {
    delete shallowObj.name
  }

  return axios.put(baseURL + ep, shallowObj,{validateStatus})
}

export const delete1 = async (ep: string): Promise<any> => {
  return axios.delete(baseURL + ep,{validateStatus})
}

// the state of all the airs that the user can select from in the drop down
export const useUserAirs = () =>
  useQuery(
    'userAirs',
    async () => {
      return getN('aircraft/deep')
    },
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: Infinity,
    }
  )

export const usePolling = (
  ep: string,
  refetchInterval = 2000,
  clientReqKey = false
) =>
  useQuery(
    ep,
    async () => {
      const res = await getN(ep)
      if (res && clientReqKey) {
        res.clientReqKey = v4()
      }
      return res
    },
    {
      refetchInterval,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchIntervalInBackground: true,
      retry: Infinity,
    }
  )
