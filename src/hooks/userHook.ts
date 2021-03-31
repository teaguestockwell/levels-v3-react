import axios from 'axios'
import {useQuery} from 'react-query'
import {Aircraft} from '../types/aircraft'

export const useUser = () => {
  const query = useQuery('user', getNAircraft, {
    staleTime: Infinity,
  })
  return {...query}
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
