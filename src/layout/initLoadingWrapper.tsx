import { useEffect, useState } from "react"
import { AircraftStore } from "../store/aircraftStore"
import { Dashboard } from "./dashboard"
import { UserService } from '../services/userService'

// wrapper to listen and handle the global first load states:
// loading: local read, local update
// error: local read, local update => retry req
// denied (aircrafts.length == 0): accessDenied page


// initial load workflow:
// show loading screen
// error = true; attempts = 0; loading = true while error {
// await req /aircrafts with timeout then error = false; loading = false; catch => attempts++;
// }
// if(res.length == 0 ) return accessDenied 
// return dashboard

// listen and set global loading state enum {Loading, Error, Denied}

export const InitLoadingWrapper = () => {
    enum reqState {
      Loading,
      Error,
      Denied,
      Loaded
    }

    const [loadingState, setLoadingState] = useState(reqState.Loading)
    const [setSelectedAir, setAirs] = AircraftStore((state) => [state.setSelectedAir, state.setAirs])
  
    useEffect(() => {

      UserService.getNAircraft().then((airMap) => { 
        setAirs(airMap)

        if(airMap.entries.length > 0){
          setSelectedAir(airMap.keys[])
          setLoadingState(reqState.Loaded)
        }
      }).catch(() => {
        
      })
      //fetchAircrafts().then(() => setAircraft(1))

    }, [])

    switch (loadingState) {
      // case reqState.Loading: return (

      // )
      // case reqState.Error: return (

      // )
      // case reqState.Denied: return (

      // )
      default: return (
        <Dashboard/>
      )
    }
}