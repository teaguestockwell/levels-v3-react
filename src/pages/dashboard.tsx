import {AirStore} from '../store/airStore'
import {formatDate} from '../util'
import {ConsoleLogger} from '../layout/consoleLogger'
import {AirSelect} from '../components/airSelect'
import { AddASelect } from '../components/addASelect'
import { AddCustomCargo } from '../components/addCustomCargo'
import { ConfigSelect } from '../components/configSelect'
import { CargoList } from '../components/cargoList'
import { Category } from '../types/aircraftDeep'

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
      <ConsoleLogger />
      
      <AirSelect />
      <AddASelect />
      <AddCustomCargo />
      <ConfigSelect/>
      <CargoList category={[Category.Emergency, Category.Extra, Category.Steward, Category.User]} />
    </>
  )
}
