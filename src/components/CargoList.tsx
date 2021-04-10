import {CargoStore, selectCargoMap, selectCargoMapKeys} from '../hooks/cargoStore'
import {cut} from '../util'
import {CargoForm} from './cargoForm'
import {Category} from '../types/aircraftDeep'

export function CargoList({category}: {category: Category[]}) {
  CargoStore(selectCargoMapKeys)
  return (
    <>
      {Array.from(selectCargoMap(CargoStore.getState()).values())
        .filter((x) => category.includes(x.category))
        .map((cargo) => {
          return (
            <CargoForm
              key={cargo.uuid + 'form'}
              cargo={{
                uuid: cargo.uuid,
                name: cut(cargo.name),
                weightEA: cut(cargo.weightEA),
                fs: cut(cargo.fs),
                qty: cut(cargo.qty),
                category: cargo.category,
              }}
            />
          )
        })}
    </>
  )
}
