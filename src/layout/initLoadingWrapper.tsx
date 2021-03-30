
// wrapper to listen and handle the global first load states:
// loading: local read, local update
// error: local read, local update => retry req
// denied (aircrafts.length == 0): accessDenied page

import { Dashboard } from "./dashboard"

// initial load workflow:
// show loading screen
// error = true; attempts = 0; loading = true while error {
// await req /aircrafts with timeout then error = false; loading = false; catch => attempts++;
// }
// if(res.length == 0 ) return accessDenied 
// return dashboard

// listen and set global loading state enum {Loading, Error, Denied}

export const InitLoadingWrapper = () => {
  return (
    <Dashboard/>
  )
}