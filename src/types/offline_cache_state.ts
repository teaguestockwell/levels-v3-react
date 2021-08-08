// these map to colors inside of the ui to show the client the state of the offline cache,
// for example, if the cache is updatable they when they click into the sync modal, the user will be able to
// confirm they would like to accept the updated state from the server into the application.
// the user chooses to accept this because it resets the state of any configurations they have made
// in exchange for the newest data
export enum OfflineCacheState {
  OUTDATED = 'outdated',
  OFFLINE = 'offline',
  FETCHING = 'fetching',
  UPDATABLE = 'updatable',
  SYNCED = 'synced',
}