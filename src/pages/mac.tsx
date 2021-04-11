import {AddASelect} from '../components/addASelect'
import {AddCustomCargo} from '../components/addCustomCargo'
import {AirSelect} from '../components/airSelect'
import {CargoList} from '../components/cargoList'
import {ConfigSelect} from '../components/configSelect'
import { TankList } from '../components/tankList'
import { AirStore } from '../hooks/airStore'
import { ConsoleLogger } from '../navigation/consoleLogger'
import {Category} from '../types/aircraftDeep'

export const Mac = () => {
  AirStore(s => s.selectedAir)
  return (
    <>
      <AirSelect />
      <AddASelect />
      <AddCustomCargo />
      <ConfigSelect />
      <TankList/>
      <ConsoleLogger />
      <CargoList
        category={[
          Category.Emergency,
          Category.Extra,
          Category.Steward,
          Category.User,
        ]}
      />
    </>
  )
}
