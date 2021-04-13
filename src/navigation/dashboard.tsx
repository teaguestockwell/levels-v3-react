import {formatDate} from '../util'
//import {ConsoleLogger} from './consoleLogger'
import {Mac} from '../pages/mac'

// page navigation with sidebar / hamburger
// aircrafts state: global read, local update
// selected aircraft state: global read, local update
// last updated datetime display & complete refresh button
// if pages are components rendered from selected page state: how can their individual state be persisted

export const Dashboard = () => {
  const lastUpdated = formatDate(new Date(Date.now()))
  return (
    <>
      <h1>{`Last updated ${lastUpdated}`}</h1>

      <Mac />
    </>
  )
}
