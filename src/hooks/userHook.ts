import axios from 'axios'
import {useQuery} from 'react-query'
import {Aircraft} from '../types/aircraft'
import {AircraftStore} from '../store/aircraftStore'

export const useUser = () => {
  const setSelectedAir = AircraftStore((state) => state.setSelectedAir)
  let hasRoles = false
  
  const query = useQuery('user', getNAircraft, {
    staleTime: Infinity,
    onSuccess: (airMap) => {
      if (airMap.entries.length > 0) {
        hasRoles = true
        setSelectedAir(airMap.keys().next().value)
      }
    },
  })
  return {...query, hasRoles}
}

const getNAircraft = async () => {
  const aircrafts: Aircraft[] = (
    await axios.get(process.env.API_BASE_URL as string)
  ).data
  const ret = new Map<number, Aircraft>()
  aircrafts.forEach((air) => ret.set(air.id, air))
  return ret
}
