/* eslint-disable @typescript-eslint/no-unused-vars */
import {Affix, Menu} from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import {MenuInfo} from 'rc-menu/lib/interface'
import {DownOutlined} from '@ant-design/icons'
import {adminStore, getAdminStoreActions} from '../hooks/admin_store'
import {getQueryObjFromEP} from '../utils/util'
import {Const} from '../utils/const'

const as = getAdminStoreActions()

export const AdminNav = () => {
  const ep = adminStore((s) => s.ep)
  const air = adminStore.getState().air

  console.log(air)

  const onClick = (menuInfo: MenuInfo) => {
    as.setEp(String(menuInfo.key))
  }

  const getSubMenuTitle = () => {
    if (!ep.includes('configCargo')) {
      return 'Cargos in Config'
    }

    const queryObj = getQueryObjFromEP(ep)
    const configName =
      air?.configs.find((c) => c.configId === queryObj.configId)?.name ??
      'No Config'
    return `Cargos in ${configName}`
  }

  return air ? (
    <Affix offsetTop={Const.HEIGHT.APP_BAR_NUM}>
      <Menu
        mode="horizontal"
        onClick={onClick}
        selectedKeys={[ep]}
        style={{boxShadow: Const.BOX_SHADOW}}
      >
        <Menu.Item key={`aircraft`}>{'My Aircraft'}</Menu.Item>
        <Menu.Item key={`cargo?aircraftId=${air.aircraftId}`}>
          {'Cargos'}
        </Menu.Item>
        <Menu.Item key={`glossary?aircraftId=${air.aircraftId}`}>
          {'Glossarys'}
        </Menu.Item>
        <Menu.Item key={`tank?aircraftId=${air.aircraftId}`}>
          {'Tanks'}
        </Menu.Item>
        <Menu.Item key={`user?aircraftId=${air.aircraftId}`}>
          {'Users'}
        </Menu.Item>
        <Menu.Item key={`config?aircraftId=${air.aircraftId}`}>
          {'Configs'}
        </Menu.Item>
        <SubMenu title={getSubMenuTitle()} icon={<DownOutlined />}>
          {air.configs.map((c) => (
            <Menu.Item
              key={`configCargo?aircraftId=${air.aircraftId}&configId=${c.configId}`}
            >
              {c.name}
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
    </Affix>
  ) : null
}
