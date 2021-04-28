import axios from 'axios'
import {useQuery} from 'react-query'
import {AircraftDeep} from '../types/aircraftDeep'

const getNAircraft = async () => {
  const aircrafts: AircraftDeep[] = (
    await axios.get(
      process.env.REACT_APP_API_BASE_URL + 'aircraft'
      //{timeout: 2}
    )
  ).data
  return new Map<number, AircraftDeep>(
    aircrafts.map((air) => [air.aircraftId, air])
  )

  // TODO: add call to /general to get highest role.
  // Put that into ret obj so dashboard can choose to display admin button
}

export const useUserAirs = () => {
  let hasRoles = false
  const query = useQuery('user', getNAircraft, {
    retry: 5,
    staleTime: Infinity,
  })
  if (query.data && query.data.size > 0) {
    hasRoles = true
  }

  return {...query, hasRoles}
}
