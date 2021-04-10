import {Button, Dropdown, Menu} from 'antd'
import {CargoStore, getActionsCS} from '../hooks/cargoStore'
import {Cargo, Category} from '../types/aircraftDeep'
import {DownOutlined} from '@ant-design/icons'
import {AirStore, selectSelectedAir} from '../hooks/airStore'
import {MenuInfo} from 'rc-menu/lib/interface'
import {CargoSchema, getCargoStringFromCargo} from '../util'



export const AddASelect = () => {
  const cs = CargoStore(getActionsCS)
  const selectedAir = AirStore(selectSelectedAir)

  const stewardCargo = selectedAir.cargos.filter(
    (x) => x.category === Category.Steward
  )
  const emergencyCargo = selectedAir.cargos.filter(
    (x) => x.category === Category.Emergency
  )
  const extraCargo = selectedAir.cargos.filter(
    (x) => x.category === Category.Extra
  )

  const schema = (AirStore.getState().cargoSchema as CargoSchema).fullObjSchema

  const onAddAddACargoClick = (menuInfo: MenuInfo) => {
    const selectedId = Number(menuInfo.key)
    const oldCargo = selectedAir.cargos.find(
      (x) => x.cargoId === selectedId
    ) as Cargo
    const newCargo = getCargoStringFromCargo(oldCargo, 1)
    const isValid = schema.isValidSync(newCargo)
    cs.putCargosIsValid(new Map([[newCargo.uuid, isValid]]))
    cs.putCargos([newCargo])
  }

  const menu = (
    <Menu onClick={onAddAddACargoClick}>
      <Menu.ItemGroup title="Steward">
        {stewardCargo.map((c) => (
          <Menu.Item key={c.cargoId}>{c.name}</Menu.Item>
        ))}
      </Menu.ItemGroup>
      <Menu.ItemGroup title="Emergency">
        {emergencyCargo.map((c) => (
          <Menu.Item key={c.cargoId}>{c.name}</Menu.Item>
        ))}
      </Menu.ItemGroup>
      <Menu.ItemGroup title="Extra">
        {extraCargo.map((c) => (
          <Menu.Item key={c.cargoId}>{c.name}</Menu.Item>
        ))}
      </Menu.ItemGroup>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        Add AddA
        <DownOutlined />
      </Button>
    </Dropdown>
  )
}
