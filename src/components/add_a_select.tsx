import {Button, Dropdown, Menu} from 'antd'
import {getUserActions} from '../hooks/user_store'
import {Cargo, Category} from '../types/aircraftDeep'
import {getUserAir, getUserSchema} from '../hooks/user_store'
import {MenuInfo} from 'rc-menu/lib/interface'
import {getCargoString, getCargoStringFromCargo} from '../utils/util'
import {PlusOutlined} from '@ant-design/icons'

const cs = getUserActions()

export const AddASelect = () => {
  const air = getUserAir()

  const stewardCargo = air.cargos.filter((x) => x.category === Category.Steward)
  const emergencyCargo = air.cargos.filter(
    (x) => x.category === Category.Emergency
  )
  const extraCargo = air.cargos.filter((x) => x.category === Category.Extra)

  const schema = getUserSchema().fullObjSchema
  
  const onAddAddACargoClick = (menuInfo: MenuInfo) => {
    const selectedId = Number(menuInfo.key)

    if(selectedId === 0){
      const newCargo = getCargoString()
      cs.putCargos([newCargo])
      return
    }

    const oldCargo = air.cargos.find((x) => x.cargoId === selectedId) as Cargo
    const newCargo = getCargoStringFromCargo(oldCargo, 1)
    const isValid = schema.isValidSync(newCargo)
    cs.putCargos([{...newCargo, isValid}])
  }

  const menu = (
    <Menu onClick={onAddAddACargoClick}>
      <Menu.ItemGroup title="Custom">
        <Menu.Item key={0}>New Custom Cargo</Menu.Item>
      </Menu.ItemGroup>
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
      <Button 
      icon={<PlusOutlined />}
      style={{
        width: '100%',
        backgroundColor: '#06645E',
        color: 'white',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
      }} 
      data-testid='user add adda'>Add Custom Cargo</Button>
    </Dropdown>
  )
}
