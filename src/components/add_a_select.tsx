import React from 'react'
import {Button, Dropdown, Menu} from 'antd'
import {getActionsCS} from '../hooks/cargo_store'
import {Cargo, Category} from '../types/aircraftDeep'
import {PlusCircleOutlined} from '@ant-design/icons'
import {getAir, getSchema} from '../hooks/air_store'
import {MenuInfo} from 'rc-menu/lib/interface'
import {getCargoStringFromCargo} from '../util'

const cs = getActionsCS()

export const AddASelect = () => {
  const air = getAir()

  const stewardCargo = air.cargos.filter((x) => x.category === Category.Steward)
  const emergencyCargo = air.cargos.filter(
    (x) => x.category === Category.Emergency
  )
  const extraCargo = air.cargos.filter((x) => x.category === Category.Extra)

  const schema = getSchema().fullObjSchema

  const onAddAddACargoClick = (menuInfo: MenuInfo) => {
    const selectedId = Number(menuInfo.key)
    const oldCargo = air.cargos.find((x) => x.cargoId === selectedId) as Cargo
    const newCargo = getCargoStringFromCargo(oldCargo, 1)
    const isValid = schema.isValidSync(newCargo)
    cs.putCargos([{...newCargo, isValid}])
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
        <PlusCircleOutlined />
      </Button>
    </Dropdown>
  )
}
