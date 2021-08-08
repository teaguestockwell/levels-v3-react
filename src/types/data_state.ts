// api/aircraft/client-server-sync?1=uuid&2=uuid&3=uuid
// this endpoint polled with the query string of the current state of the clients active aircraft
// the query string is built from the dataState prop of react query client cache
// because the api updated the deepHashId of an aircraft when one of its fk models changes,
// the api can tell us if we have an outdated query without having to send us a new query to diff
// key:aircraftId, value:deepHashId
export type DataState = Record<number, string>