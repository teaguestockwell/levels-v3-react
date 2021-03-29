import {CargoStore} from '../store/cargoStore'
import {v4} from 'uuid'
import {useEffect, useRef} from 'react'
import {CargoCategory, Cargo} from '../types/cargo'
import {AircraftStore} from '../store/aircraftStore'
import {Util} from '../util'
import { CargoForm } from './cargoForm'

export function CargoList() {
  // subscribe to state changes with deepScriptEquals
  // on change re-render
  const putCargo = CargoStore((state) => state.putCargo)
  const cargoMapKeys = CargoStore((state) => state.cargosMap.keys())

  //initiablize a mutabale ref to state
  const cargosRef = useRef(CargoStore.getState().cargosMap)

  // TODO: remove this and put it in dropdown
  const fetchAircrafts = AircraftStore((state) => state.fetchAircrafts)
  const setAircraft = AircraftStore((state) => state.setSelectedAircraft)


  useEffect(() => {
    //subscibe that mutable ref to changes during life of component
    CargoStore.subscribe(
      (cargosMap) => (cargosRef.current = cargosMap as Map<string, Cargo>),
      // pick a specific part of that state
      (state) => state.cargosMap
    )

    // TODO: remove this and put it in dropdown
    fetchAircrafts().then(() => setAircraft(1))
  }, [fetchAircrafts, setAircraft])

  // adding new cargo
  function onAdd() {
    const id = v4()
    putCargo({
      cargoId: id,
      name: `cargo ${id}`,
      weight: 1,
      fs: 1,
      qty: 1,
      category: CargoCategory.Extra,
    })
  }

  // change cargo qtys
  function onEdit(): void {
    for (const cargo of Array.from(cargosRef.current.values())) {
      cargo.qty = 0
      console.log(cargo)
      // this will not cause redraw
      putCargo(cargo)
    }
  }

  function getItems(): JSX.Element[] {
    return Array.from(cargoMapKeys).map((id) => {
      const cargo = cargosRef.current.get(id) as Cargo
      return (<CargoForm {...{
        cargoId: cargo.cargoId,
        name: Util.cut(cargo.name),
        weight: Util.cut(cargo.weight),
        fs: Util.cut(cargo.fs),
        qty: Util.cut(cargo.qty),
      }} />)
    })
  }

  return (
    <>
      <button onClick={onEdit}>edit</button>
      <button onClick={onAdd}>add</button>
      {getItems()}
    </>
  )
}
