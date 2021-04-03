import { Button, Dropdown, Menu } from "antd"
import { AirStore } from "../store/airStore"
import { CargoStore } from "../store/cargoStore"
import {DownOutlined} from '@ant-design/icons'
import {MenuInfo} from 'rc-menu/lib/interface'
import { AircraftDeep, Config } from "../types/aircraftDeep"
import { useState } from "react"
import { buildMap, configToNewCargoStrings, getYupSchema } from "../util"

export const ConfigSelect = () => {
  const [
    deleteCargos,
    deleteCargosIsValid,
    putCargos,
    putCargosIsValid
  ] = CargoStore(state => [
    state.deleteCargos,
    state.deleteCargosIsValid,
    state.putCargos,
    state.putCargosIsValid
  ])
  const selectedAir = AirStore(state => state.selectedAir) as AircraftDeep
  const configs = selectedAir.configs
  const schema = getYupSchema(selectedAir)
  const noConfig = {configId: 0, configCargos: [], name: 'No Config', aircraftId: selectedAir.aircraftId}
  const [config, setConfig] = useState<Config>(noConfig)

  const onConfigChange = (menuInfo: MenuInfo) => {
    const newConfigId = Number(menuInfo.key)
    let newConfig: Config
    if(newConfigId === 0){newConfig = noConfig}
    else{newConfig = configs.find(c => c.configId === newConfigId) as Config}
    console.log(newConfig.name)
    const newCargos = configToNewCargoStrings(newConfig)

    // new map where k: cargoId, v: isValid
    const newIsValids = newCargos.map(c => schema.isValidSync(c))
    const newCargoIds = newCargos.map(c => c.cargoId)
    const newCargoIsValidMap = buildMap(newCargoIds, newIsValids)

    // remove old config from cargo store
    const oldConfigIds = config.configCargos.map(cc => cc.cargoId)
    deleteCargosIsValid(oldConfigIds)
    deleteCargos(oldConfigIds)

    // add new configs
    putCargosIsValid(newCargoIsValidMap)
    putCargos(newCargos)

    // update selected
    setConfig(newConfig)
  }

  const menu = (
    <Menu onClick={onConfigChange}>
      {[
        <Menu.Item key={0}>No Config</Menu.Item>,
        ...configs.map((c) => (
        <Menu.Item key={c.configId}>{c.name}</Menu.Item>
        ))
      ]}
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        {config.name}
        <DownOutlined />
      </Button>
    </Dropdown>
  )

}