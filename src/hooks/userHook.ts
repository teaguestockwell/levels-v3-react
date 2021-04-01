import axios from 'axios'
import {useQuery} from 'react-query'
import {Aircraft} from '../types/aircraft'

export const useUser = () => {
  let hasRoles =  false
  const query = useQuery('user', getNAircraft, {
    staleTime: Infinity,
  })
  if(query.data && query.data.size > 0){hasRoles = true}
  return {...query, hasRoles} 
}

const getNAircraft = async () => {
  const aircrafts: Aircraft[] = (
    await axios.get(process.env.REACT_APP_API_BASE_URL + 'aircraft')
  ).data

  const ret = new Map<number, Aircraft>()
  aircrafts.forEach((air) => ret.set(air.id, air))

  return ret

  // TODO: add call to /general to get highest role.
  // Put that into ret obj so dashboard can choose to display admin button
}
