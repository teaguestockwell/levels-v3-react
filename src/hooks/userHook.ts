import axios from 'axios'
import {useQuery} from 'react-query'
import {AircraftDeep} from '../types/aircraftDeep'

export const useUser = () => {
  let hasRoles =  false
  const query = useQuery('user', getNAircraft, {
    staleTime: Infinity,
  })
  if(query.data && query.data.size > 0){hasRoles = true}
  return {...query, hasRoles} 
}

const getNAircraft = async () => {
  const aircrafts: AircraftDeep[] = (
    await axios.get(process.env.REACT_APP_API_BASE_URL + 'aircraft')
  ).data

  const ret = new Map<number, AircraftDeep>()
  aircrafts.forEach((air) => ret.set(air.id, air))

  return ret

  // TODO: add call to /general to get highest role.
  // Put that into ret obj so dashboard can choose to display admin button
}
