import {CargoList} from '../components/cargoList'
import {AirStore} from '../store/aircraftStore'
import {useEffect} from 'react'
import {Aircraft} from '../types/aircraft'
import { Util } from '../util'

// page navigation with sidebar / hamburger
// aircrafts state: global read, local update
// selected aircraft state: global read, local update
// last updated datetime display & complete refresh button
// if pages are components rendered from selected page state: how can their individual state be persisted

interface Props {
  airMap: Map<number, Aircraft>
}

export const Dashboard = (props: Props) => {
  const setSelectedAir = AirStore((state) => state.setSelectedAir)
  const lastUpdated = Util.formatDate(new Date(Date.now()))
  
  // init the selected air in global state to be first in airMap
  useEffect(() => {
    setSelectedAir(props.airMap.values().next().value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <CargoList />
}
