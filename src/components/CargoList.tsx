import { v4 } from 'uuid'
import {getCargoMap, useCargoMapSize} from '../hooks/CargoStore'
import {Category} from '../types/aircraftDeep'
import { FormModal } from './FormModal'

export function CargoList({category}: {category: Category[]}) {
  useCargoMapSize()
  return (
    <>
      {Array.from(getCargoMap().values())
        .filter((x) => category.includes(x.category))
        .map((cargo) => {
          return <FormModal key={v4()} uuid={cargo.uuid}/>
        })}
    </>
  )
}
