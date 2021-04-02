import {Category} from '../types/aircraftDeep'
import {CargoList} from './cargoList'
import { AddASelect } from './addASelect'
import { AddCustomCargo } from './addCustomCargo'

export const UserCargo = () => {

  return <>
    <AddCustomCargo/>
    <AddASelect/>
    <CargoList category={Category.User} />
  </>
}
