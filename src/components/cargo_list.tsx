import {userStore, useCargoMapSize} from '../hooks/user_store'
import {Category} from '../types/aircraftDeep'
import {CargoEditButton} from './cargo_edit_button'

export function CargoList({category}: {category: Category[]}) {
  useCargoMapSize()
  return (
    <>
      {Array.from(userStore.getState().cargoMap.values())
        .filter((x) => category.includes(x.category))
        .map((cargo) => (
          <CargoEditButton uuid={cargo.uuid} key={cargo.uuid} />
        ))}
    </>
  )
}
