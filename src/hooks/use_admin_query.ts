import axios from 'axios'
import {useQuery} from 'react-query'
import {getQueryString} from '../util'

/**
 *
 * @param ep the endpoint to poll
 * @returns array of objects within that endpoint
 */
export const UseAdminQuery = (ep: string, reqParams: any) => {
  return useQuery(
    ep,
    async () => {
      const queryParams: string = reqParams
        ? '?' + getQueryString(reqParams)
        : ''
      return (
        await axios.get(process.env.REACT_APP_API_BASE_URL + ep + queryParams,
          //{timeout: 2}
          )
      ).data
    },
    {
      retry: 5,
      refetchInterval: 2000,
    }
  )
}
