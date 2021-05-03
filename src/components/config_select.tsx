import {getAir, getSchema} from '../hooks/air_store'
import {CargoStore, getActionsCS} from '../hooks/cargo_store'
import {Category, Config} from '../types/aircraftDeep'
import {getCargoStringsFromConfig} from '../util'
import {Const} from '../const'
import {Select} from 'antd'

const {Option} = Select

export const ConfigSelect = () => {
  const cs = getActionsCS()
  const air = getAir()
  const objSchema = getSchema().fullObjSchema
  const configEnums = [Category.Emergency, Category.Extra, Category.Steward]

  const onChange = async (newId: number) => {
    // get config from selection
    let newConfig: Config
    if (newId === 0) {
      newConfig = Const.NO_CONFIG
    } else {
      newConfig = air.configs.find((c) => c.configId === newId) as Config
    }

    // get an array of cargoStrings from that config
    const newCargos = getCargoStringsFromConfig(newConfig)
      // validate em
      .map((c) => ({...c, isValid: objSchema.isValidSync(c)}))

    // remove old config from cargo store
    cs.deleteCargos(
      Array.from(CargoStore.getState().cargoMap.values())
        .filter((c) => configEnums.includes(c.category))
        .map((c) => c.uuid)
    )

    // add new config
    cs.putCargos(newCargos)

    // update selected
    cs.setConfig(newConfig)
  }

  return (
    <Select
      onChange={onChange}
      defaultValue={0}
      style={{width: Const.SELECT_WIDTH}}
    >
      <Option value={0}>No Config</Option>
      {air.configs.map((c) => (
        <Option value={c.configId} key={c.configId}>
          {c.name}
        </Option>
      ))}
    </Select>
  )
}
