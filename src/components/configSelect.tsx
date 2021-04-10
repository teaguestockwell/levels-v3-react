import {Button, Dropdown, Menu} from 'antd'
import {AirStore, selectCargoSchema, selectSelectedAir} from '../hooks/airStore'
import {CargoStore, getActionsCS, selectConfig} from '../hooks/cargoStore'
import {DownOutlined} from '@ant-design/icons'
import {MenuInfo} from 'rc-menu/lib/interface'
import {Config} from '../types/aircraftDeep'
import {getCargoStringsFromConfig} from '../util'
import {Const} from '../const'

export const ConfigSelect = () => {
  const cs = CargoStore(getActionsCS)
  const config = CargoStore(selectConfig)
  const selectedAir = AirStore(selectSelectedAir)
  const schema = selectCargoSchema(AirStore.getState()).fullObjSchema

  const onConfigChange = async (menuInfo: MenuInfo) => {
    console.log('onConfigChange')
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
    const newCargoMap = new Map<string, boolean>(
      newCargos.map<[string, boolean]>(c => 
        [c.uuid, schema.isValidSync]
      )
    )

    // remove old config from cargo store
    const oldUuids = CargoStore.getState().configUuids
    cs.deleteCargosIsValid(oldUuids)
    cs.deleteCargos(oldUuids)

    // add new config
    cs.putCargosIsValid(newCargoMap)
    cs.putCargos(newCargos)
    
    // update selected
    cs.putConfigUuids(Array.from(newCargoMap.keys()))
    cs.putConfig(newConfig)
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
