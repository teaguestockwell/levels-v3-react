import axios from 'axios'
import {useQuery} from 'react-query'
import {v4} from 'uuid'
import {removeNestedObj} from '../utils/util'

const baseURL = process.env.REACT_APP_API_BASE_URL

export const getN = async (url: string) => {
  return axios({
    baseURL,
    url,
    method: 'get',
  })
    .then((res) => res.data)
    .catch(() => {
      return null
    })
}

export const put1 = async (obj: any, ep: string): Promise<number> => {
  // remove all values that are an object
  const shallowObj = removeNestedObj(obj)

  // name is not a prop on config cargo because it is derived from its cargoId
  // we use name up until this point for toast
  if (ep.includes('configCargo')) {
    delete shallowObj.name
  }

  return (await axios.put(baseURL + ep, shallowObj)).status
}

export const delete1 = async (ep: string): Promise<number> => {
  return (await axios.delete(baseURL + ep)).status
}

// the state of all the airs that the user can select from in the drop down
export const useUserAirs = () =>
  useQuery(
    'userAirs',
    async () => {
      return getN('aircraft/lastUpdated')
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
