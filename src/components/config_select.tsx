import React from 'react'
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
      Array.from(CargoStore.getState().cargoMap.values())
        .filter((c) => configEnums.includes(c.category))
        .map((c) => c.uuid)
    )

    // add new config
    cs.putCargos(newCargos)

    // update selected
    cs.putConfig(newConfig)
  }

  return (
    <Select
      onChange={onChange}
      defaultValue={'No Config'}
      style={{width: Const.SELECT_WIDTH}}
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
