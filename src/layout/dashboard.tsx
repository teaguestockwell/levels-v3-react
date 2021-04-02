import {AirStore} from '../store/airStore'
import {AircraftDeep} from '../types/aircraftDeep'
import {formatDate} from '../util'
import {ConsoleLogger} from './consoleLogger'
import {UserCargo} from '../components/userCargo'
import { AirSelect } from '../components/airSelect'

// page navigation with sidebar / hamburger
// aircrafts state: global read, local update
// selected aircraft state: global read, local update
// last updated datetime display & complete refresh button
// if pages are components rendered from selected page state: how can their individual state be persisted


export const Dashboard = () => {
  const lastUpdated = formatDate(new Date(Date.now()))
  const selectedAir = AirStore((state) => state.selectedAir)

  return (
    <>
      <AirSelect/>
      <ConsoleLogger />
      <UserCargo />
    </>
  )
}
