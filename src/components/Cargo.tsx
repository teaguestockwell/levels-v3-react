import {ICargo} from '../types/ICargo'
import {CargoStore} from '../store/CargoStore'

export function Cargo(props: ICargo) {
  const deleteCargo = CargoStore((state) => state.deleteCargo)

  return (
    <li key={props.id}>
      <>
        {props.name}
        <button onClick={() => deleteCargo(props.id)}>Delete</button>
      </>
    </li>
  )
}
