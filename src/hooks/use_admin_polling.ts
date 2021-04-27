import axios from 'axios'
import {useQuery} from 'react-query'

export const UseAdminPolling = () => {
  return useQuery(
    'aircraft_polling',
    async () => {
      return(
        await axios.get(process.env.REACT_APP_API_BASE_URL + 'aircraft')
      ).data
    },
    {
      retry: 5,
      refetchInterval: 2000,
    }
  )
}
