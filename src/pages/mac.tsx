import {AddASelect} from '../components/addASelect'
import {AddCustomCargo} from '../components/addCustomCargo'
import {AirSelect} from '../components/airSelect'
import {CargoList} from '../components/cargoList'
import {ConfigSelect} from '../components/configSelect'
import {Category} from '../types/aircraftDeep'

export const Mac = () => {
  return (
    <>
      <AirSelect />
      <AddASelect />
      <AddCustomCargo />
      <ConfigSelect />
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
