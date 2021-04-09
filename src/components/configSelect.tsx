import {Button, Dropdown, Menu} from 'antd'
import {AirStore} from '../hooks/airStore'
import {CargoStore} from '../hooks/cargoStore'
import {DownOutlined} from '@ant-design/icons'
import {MenuInfo} from 'rc-menu/lib/interface'
import {AircraftDeep, Config} from '../types/aircraftDeep'
import {CargoSchema, getCargoStringsFromConfig} from '../util'
import {Const} from '../const'

export const ConfigSelect = () => {
  const [
    config,
    deleteCargos,
    deleteCargosIsValid,
    putCargos,
    putCargosIsValid,
    putConfigUuids,
    putConfig,
  ] = CargoStore((state) => [
    state.config,
    state.deleteCargos,
    state.deleteCargosIsValid,
    state.putCargos,
    state.putCargosIsValid,
    state.putConfigUuids,
    state.putConfig,
  ])
  const selectedAir = AirStore((state) => state.selectedAir) as AircraftDeep
  const schema = (AirStore.getState().cargoSchema as CargoSchema).fullObjSchema

  const onConfigChange = async (menuInfo: MenuInfo) => {
    // get config from selection
    const newConfigId = Number(menuInfo.key)
    let newConfig: Config
    if (newConfigId === 0) {
      newConfig = Const.NO_CONFIG
    } else {
      newConfig = selectedAir.configs.find(
        (c) => c.configId === newConfigId
      ) as Config
    }

    // get an array of cargoStrings from that config
    const newCargos = getCargoStringsFromConfig(newConfig)

    // k: uuid, v: isValid
    const newCargoMap = new Map<string, boolean>()

    // parallel promises
    const promises: Promise<any>[] = newCargos.map(async (c) =>
      newCargoMap.set(c.uuid, await schema.isValid(c))
    )
    await Promise.all(promises)

    // remove old config from cargo store
    const oldUuids = CargoStore.getState().configUuids
    deleteCargosIsValid(oldUuids)
    deleteCargos(oldUuids)

    // add new configs
    putCargosIsValid(newCargoMap)
    putCargos(newCargos)
    putConfigUuids(Array.from(newCargoMap.keys()))

    // update selected
    putConfig(newConfig)
  }

  const menu = (
    <Menu onClick={onConfigChange}>
      {[
        <Menu.Item key={0}>No Config</Menu.Item>,
        ...selectedAir.configs.map((c) => (
          <Menu.Item key={c.configId}>{c.name}</Menu.Item>
        )),
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
