import axios from 'axios'
import {useQuery} from 'react-query'
import {v4} from 'uuid'

const getNAircraft = async () => {
  try {
    const data = (
      await axios.get(
        process.env.REACT_APP_API_BASE_URL + 'aircraft/lastUpdated'
        //{timeout: 2}
      )
    ).data

    // used to diff reqs that came from the same sw cache
    data.key = v4()
    return data
  } catch (e) {
    console.error(e)
    return null
  }
  // TODO: add call to /general to get highest role.
  // Put that into ret obj so dashboard can choose to display admin button
}

// the state of all the airs that the user can select from in the drop down
export const useUserAirs = () => {
  let hasRoles = false

  const query = useQuery('userAirs', getNAircraft, {
    retry: 5,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  if (query.data && query.data.airs.length > 0) {
    hasRoles = true
  }

  return {...query, hasRoles}
}

// given the useUserAirs,
// when we poll the api update last updated state,
// if client airs !== server airs,
// promp the user to setQueryData of userAirs,
// then revert the client to init loading state with new data
// else update last updated
export const useUserAirsPolling = () => {
  let hasRoles = false

  const query = useQuery('userAirPolling', getNAircraft, {
    retry: 5,
    refetchInterval: 10000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  if (query.data && query.data.airs.length > 0) {
    hasRoles = true
  }

  return {...query, hasRoles}
}
