import {
  getUserAir,
  getUserSchema,
  userStore,
  getUserActions,
} from '../hooks/user_store'
import * as Types from '../types'
import {getCargoStringsFromConfig} from '../utils/util'
import {Const} from '../utils/const'
import {Select} from 'antd'

export const ConfigSelect = () => {
  const cs = getUserActions()
  const air = getUserAir()
  const objSchema = getUserSchema().fullObjSchema
  const configEnums = [Types.CargoCategory.Emergency, Types.CargoCategory.Extra, Types.CargoCategory.Steward]

  const onChange = (newName: string) => {
    // get config from selection
    let newConfig: Types.Config
    if (newName === 'No Config') {
      newConfig = Const.NO_CONFIG
    } else {
      newConfig = air.configs.find((c) => c.name === newName) as Types.Config
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
      style={{width: '100%', textAlign: 'center', paddingTop: 10, display: 'flex' }}
      dropdownStyle={{textAlign: 'center'}}
      showSearch
      size="large"
      virtual={true}
      options={
        [
          {
            value: 'No Config',
            label: 'No Config'
          },

          ...air.configs.map(c => ({
            value: c.name,
            label: c.name,
          }))
        ]
      }
    />
  )
}
