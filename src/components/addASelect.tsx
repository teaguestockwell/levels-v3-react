import {Button, Dropdown, Menu} from 'antd'
import {CargoStore} from '../store/cargoStore'
import {AircraftDeep, Cargo, Category} from '../types/aircraftDeep'
import {DownOutlined} from '@ant-design/icons'
import {AirStore} from '../store/airStore'
import { MenuInfo } from 'rc-menu/lib/interface'
import {cargoToNewCustomCargo,getYupSchema} from '../util'

export const AddASelect = () => {
  const [putCargo, putCargoIsValid] = CargoStore((state) => [
    state.putCargo,
    state.putCargoIsValid,
  ])

  const air = AirStore.getState().selectedAir as AircraftDeep

  const stewardCargo = air.cargos.filter(x => x.category === Category.Steward)
  const emergencyCargo = air.cargos.filter(x => x.category === Category.Emergency)
  const extraCargo = air.cargos.filter((x) => x.category === Category.Extra)

  const schema = getYupSchema(air)

  const onAddAddACargoClick = (menuInfo: MenuInfo) => {
    const selectedId = Number(menuInfo.key)
    const oldCargo = air.cargos.find((x) => x.cargoId === selectedId) as Cargo
    const newCargo = cargoToNewCustomCargo(oldCargo, 1)
    const isValid = schema.isValidSync(newCargo)
    putCargoIsValid(isValid, newCargo.cargoId)
    putCargo(newCargo)
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

  return <Dropdown 
        overlay={menu}
        trigger={['click']}
        >
        <Button >
          Add AddA
          <DownOutlined />
        </Button>
      </Dropdown>
}