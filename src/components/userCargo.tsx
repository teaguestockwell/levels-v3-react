import {Button, Dropdown, Menu} from 'antd'
import {CargoStore} from '../store/cargoStore'
import {AircraftDeep, Cargo, Category} from '../types/aircraftDeep'
import {CargoString} from '../types/cargoString'
import {CargoList} from './cargoList'
import {PlusCircleOutlined} from '@ant-design/icons'
import {DownOutlined} from '@ant-design/icons'
import {AirStore} from '../store/aircraftStore'
import {
  cargoToNewCustomCargo,
  getNewCustomCargoString,
  getYupSchema,
} from '../util'

export const UserCargo = () => {
  const [putCargo, putCargoIsValid] = CargoStore((state) => [
    state.putCargo,
    state.putCargoIsValid,
  ])
  const air = AirStore.getState().selectedAir as AircraftDeep
  const stewardCargo = air.cargos.filter((x) => x.category === Category.Steward)
  const emergencyCargo = air.cargos.filter(
    (x) => x.category === Category.Emergency
  )
  const extraCargo = air.cargos.filter((x) => x.category === Category.Extra)
  const schema = getYupSchema(air)

  const onAddCustomCargoClick = () => {
    const newCargo = getNewCustomCargoString()
    putCargoIsValid(false, newCargo.cargoId)
    putCargo(newCargo)
  }

  const onAddAddACargoClick = (menuInfo: any) => {
    // eslint-disable-next-line eqeqeq
    const oldCargo = air.cargos.find((x) => x.cargoId == menuInfo.key) as Cargo
    const newCargo = cargoToNewCustomCargo(oldCargo, 1)
    const isValid = schema.isValidSync(newCargo)
    putCargoIsValid(isValid, newCargo.cargoId)
    putCargo(newCargo)
  }

  const menu = (
    <Menu onClick={onAddAddACargoClick}>
      <Menu.SubMenu title="Steward">
        {stewardCargo.map((c) => (
          <Menu.Item key={c.cargoId}>{c.name}</Menu.Item>
        ))}
      </Menu.SubMenu>
      <Menu.SubMenu title="Emergency">
        {emergencyCargo.map((c) => (
          <Menu.Item key={c.cargoId}>{c.name}</Menu.Item>
        ))}
      </Menu.SubMenu>
      <Menu.SubMenu title="Extra">
        {extraCargo.map((c) => (
          <Menu.Item key={c.cargoId}>{c.name}</Menu.Item>
        ))}
      </Menu.SubMenu>
    </Menu>
  )

  return (
    <>
      <Button
        //type="primary"
        icon={<PlusCircleOutlined />}
        onClick={onAddCustomCargoClick}
        block
      >
        Add Custom
      </Button>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button block>
          Add AddA
          <DownOutlined />
        </Button>
      </Dropdown>
      <CargoList category={Category.User} />
    </>
  )
}
