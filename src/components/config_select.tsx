import {getUserAir, getUserSchema} from '../hooks/user_store'
import {userStore, getUserActions} from '../hooks/user_store'
import {Category, Config} from '../types/aircraftDeep'
import {getCargoStringsFromConfig} from '../utils/util'
import {Const} from '../utils/const'
import {Select} from 'antd'

const {Option} = Select

export const ConfigSelect = () => {
  const cs = getUserActions()
  const air = getUserAir()
  const objSchema = getUserSchema().fullObjSchema
  const configEnums = [Category.Emergency, Category.Extra, Category.Steward]

  const onChange = async (newName: string) => {
    // get config from selection
    let newConfig: Config
    if (newName === 'No Config') {
      newConfig = Const.NO_CONFIG
    } else {
      newConfig = air.configs.find((c) => c.name === newName) as Config
    }

    // get an array of cargoStrings from that config
    const newCargos = getCargoStringsFromConfig(newConfig)
      // validate em
      .map((c) => ({...c, isValid: objSchema.isValidSync(c)}))

    // remove old config from cargo store
    cs.deleteCargos(
      Array.from(userStore.getState().cargoMap.values())
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
      data-testid={`user config select`}
      onChange={onChange}
      defaultValue={userStore.getState().config.name}
      style={{width: '100%', textAlign: 'center'}}
      dropdownStyle={{textAlign: 'center'}}
      showSearch
    >
      <Option value={'No Config'}>No Config</Option>
      {air.configs.map((c) => (
        <Option value={c.name} key={c.configId}>
          {c.name}
        </Option>
      ))}
    </Select>
  )
}
