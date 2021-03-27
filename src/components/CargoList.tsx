import {CargoStore} from '../store/CargoStore'
import {CargoForm} from './CargoForm'
import {Expanded} from './Expanded'
import {v4} from 'uuid'
import { useEffect, useRef } from 'react'
import { ICargo } from '../types/ICargo'
import { AircraftStore } from '../store/AircraftStore'

export function CargoList() {
  // subscribe to all changes of state with deepScriptEquals
  // on change re-render
  const putCargo = CargoStore(state => state.putCargo)
  const cargoIds = CargoStore(state => state.cargoIds)

  // TODO: remove this and put it in dropdown
  const fetchAircrafts = AircraftStore(state => state.fetchAircrafts)
  const setAircraft = AircraftStore(state => state.setSelectedAircraft)

  // initiablize a mutabale ref to state
  const cargosRef = useRef(CargoStore.getState().cargos)

  // subscibe that mutable ref to changes during life of component
  useEffect(() => {
    CargoStore.subscribe(
      (cargos: ICargo[]) => (cargosRef.current = cargos), 
      state => state.cargos
    )
    
    // TODO: remove this and put it in dropdown
    fetchAircrafts().then(() => setAircraft(1))

  },[fetchAircrafts, setAircraft])

  // simulate adding new cargo
  function onAdd() {
    const id = v4()
    putCargo({id: id, name: `cargo ${id}`, weight: 1, fs: 1, qty: 1})
  }

  return (
    <>
      <button onClick={onAdd}>add</button>
        {cargoIds.map((id) => {
          // get the current state of a cargo from cargos ref at a given id
          const cargoAtId = cargosRef.current.filter(x => x.id === id)[0]

          return <Expanded title={cargoAtId.name} key={cargoAtId.id} child={<CargoForm {...cargoAtId}/>}/>
        })}
    </>
  )
}