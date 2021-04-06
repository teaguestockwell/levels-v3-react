import {CargoStore} from '../hooks/cargoStore'
import {cut} from '../util'
import {CargoForm} from './cargoForm'
import {Category} from '../types/aircraftDeep'
export function CargoList({category}: {category: Category[]}) {
  // repaint when cargoMap.keys() changes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cargoMapKeys = CargoStore((state) => state.cargoMap.keys())

  function getItems(): JSX.Element[] {
    return Array.from(CargoStore.getState().cargoMap.values())
      .filter((x) => category.includes(x.category))
      .map((cargo) => {
        return (
          <CargoForm
            key={cargo.uuid + 'form'}
            {...{
              uuid: cargo.uuid,
              name: cut(cargo.name),
              weightEach: cut(cargo.weightEach),
              fs: cut(cargo.fs),
              qty: cut(cargo.qty),
              category: cargo.category,
            }}
          />
        )
      })
  }

  return <>{getItems()}</>
}
