import {CargoStore} from '../store/CargoStore'
import {Cargo} from './Cargo'
import {v4} from 'uuid'

export function CargoList() {
  const cargosState = CargoStore((state) => state.cargos)
  const putCargo = CargoStore((state) => state.putCargo)

  function onAdd() {
    const id = v4()
    putCargo({id: id, name: `cargo ${id}`, weight: 1, fs: 1, qty: 1})
  }

  return (
    <>
      <button onClick={onAdd}>add</button>
      <ul>
        {cargosState.map((cargo) => (
          <Cargo {...cargo} />
        ))}
      </ul>
    </>
  )
}
