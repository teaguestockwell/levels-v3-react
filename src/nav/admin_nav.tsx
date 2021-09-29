import {Grid, Menu} from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import {MenuInfo} from 'rc-menu/lib/interface'
import {adminStore, getAdminStoreActions} from '../hooks/admin_store'
import {getQueryObjFromEP} from '../utils/util'

const as = getAdminStoreActions()

export const getSubMenuTitle = (ep:string, air:any) => {
  if (!ep.includes('configCargo')) return 'Cargos in Config'

  const queryObj = getQueryObjFromEP(ep)
  const configName = air?.configs.find((c:any) => c.configId === queryObj.configId)?.name ?? 'No Config'
  return `Cargos in ${configName}`
}
export const AdminNav = () => {
  const ep = adminStore((s) => s.ep)
  const air = adminStore.getState().air
  const onClick = (menuInfo: MenuInfo) => as.setEp(String(menuInfo.key))
  const mode = Grid.useBreakpoint().md ? 'horizontal' : 'inline'

  return air ? (
    <div
      data-testid="admin-nav"
    >
      <Menu
        mode={mode}
        onClick={onClick}
        selectedKeys={[ep]}
      >
        <Menu.Item key={`aircraft`}>{'My Aircraft'}</Menu.Item>
        <Menu.Item
          key={`cargo?aircraftId=${air.aircraftId}`}
          data-testid="admin cargos"
        >
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
        <SubMenu title={getSubMenuTitle(ep,air)}>
          {air.configs.map((c) => (
            <Menu.Item
              key={`configCargo?aircraftId=${air.aircraftId}&configId=${c.configId}`}
            >
              {c.name}
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
    </div>
  ) : null
}
