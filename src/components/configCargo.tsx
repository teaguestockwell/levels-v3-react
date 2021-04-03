import { Category } from '../types/aircraftDeep'
import {CargoList} from './cargoList'
import { ConfigSelect } from './configSelect'

export const ConfigCargo = () => {

  return <>
    <ConfigSelect/>
    <CargoList category={[Category.Emergency, Category.Extra, Category.Steward]}/>
  </>
}