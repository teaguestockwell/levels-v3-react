import {Button, Dropdown, Menu} from 'antd'
import {getAir, getSchema} from '../hooks/AirStore'
import {getActionsCS, getConfigUuids, useConfigName} from '../hooks/CargoStore'
import {DownOutlined} from '@ant-design/icons'
import {MenuInfo} from 'rc-menu/lib/interface'
import {Config} from '../types/aircraftDeep'
import {getCargoStringsFromConfig} from '../util'
import {Const} from '../const'

export const ConfigSelect = () => {
  const configName = useConfigName()

  const cs = getActionsCS()
  const selectedAir = getAir()
  const objSchema = getSchema().fullObjSchema

  const onConfigChange = async (menuInfo: MenuInfo) => {
    //console.log('onConfigChange')

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
      // validate em
      .map(c => ({...c, isValid: objSchema.isValidSync(c)}))

    // remove old config from cargo store
    cs.deleteCargos(getConfigUuids())

    // add new config
    cs.putCargos(newCargos)

    // update selected
    cs.putConfigUuids(newCargos.map(c => c.uuid))
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
        {configName}
        <DownOutlined />
      </Button>
    </Dropdown>
  )
}
