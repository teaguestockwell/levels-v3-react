import {CargoStore } from '../store/cargoStore'
import {cut } from '../util'
import {CargoForm} from './cargoForm'
import { Category } from '../types/aircraftDeep'
export function CargoList({category}: {category: Category}) {
  // repaint when cargoMap.keys() changes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cargoMapKeys = CargoStore(state => state.cargoMap.keys())

  function getItems(): JSX.Element[] {
    return Array.from(CargoStore.getState().cargoMap.values())
      .filter(x => x.category === category)
      .map((cargo) => {
        return <CargoForm {...{
          cargoId: cargo.cargoId,
          name: cut(cargo.name),
          weight: cut(cargo.weight),
          fs: cut(cargo.fs),
          qty: cut(cargo.qty),
          category: cargo.category
        }}/>
      })
  }

  return (
    <>
      {getItems()}
    </>
  )
}
