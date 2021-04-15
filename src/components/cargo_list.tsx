import {getCargoMap, useCargoMapSize} from '../hooks/cargo_store'
import {Category} from '../types/aircraftDeep'
import { FormModal } from './form_modal'

export function CargoList({category}: {category: Category[]}) {
  useCargoMapSize()
  return (
    <>
      {Array.from(getCargoMap().values())
        .filter((x) => category.includes(x.category))
        .map((cargo) => {
          return <FormModal key={cargo.uuid + 'form_modal'} uuid={cargo.uuid}/>
        })}
    </>
  )
}
