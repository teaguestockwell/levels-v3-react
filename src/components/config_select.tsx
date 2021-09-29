import {
  getUserAir,
  getUserSchema,
  userStore,
  getUserActions,
} from '../hooks/user_store'
import * as Types from '../types'
import {getCargoStringsFromConfig} from '../utils/util'
import {Const} from '../utils/const'
import { CustomSelect } from './custom_select'

export const onChange = (newName: string, air:any) => {
  const objSchema = getUserSchema().fullObjSchema
  const configEnums = [Types.CargoCategory.Emergency, Types.CargoCategory.Extra, Types.CargoCategory.Steward]
  const cs = getUserActions()

  // get config from selection
  let newConfig: Types.Config
  if (newName === 'No Config') {
    newConfig = Const.NO_CONFIG
  } else {
    newConfig = air.configs.find((c:any) => c.name === newName) as Types.Config
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

export const ConfigSelect = () => {
  const air = getUserAir()

  return (
    <CustomSelect
    stateKey="configSelect"
      data-testid={`user config select`}
      onChange={(newName:string) => onChange(newName, air)}
      defaultValue={userStore.getState().config.name}
      style={{width: '100%',paddingTop: 10, display: 'flex' }}
      dropdownStyle={{}}
      showSearch
      size="large"
      virtual={true}
      bordered={false}
      options={
        [
          {
            value: 'No Config',
            label: 'No Config',
            className: 'pad20'
          },

          ...air.configs.map(c => ({
            value: c.name,
            label: c.name,
            className: 'pad20'
          }))
        ]
      }
    />
  )
}
