/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, Select } from "antd"
import { useEffect } from "react";
import { adminStore, getAdminStoreActions } from "../hooks/admin_store";
const { Option } = Select;

const as = getAdminStoreActions()

export const AdminCargoSelect = ({validate}: {validate: () => void}) => {
  const store = adminStore.getState()
  const allCargo = store.air?.cargos ?? []
  const selectedId = store.editObj?.cargoId
  console.log('admin cargo select render id: ' + selectedId)


  const onChange = (newCargoId:number) => {
    const storeState = adminStore.getState()

    storeState.setEditObj({...store.editObj,cargoId: newCargoId})
    console.log(adminStore.getState().editObj)

    validate()
  }

  return <Form.Item
  key={'cargo_select_form_item'}
  name={`Cargo`}
  label={`Cargo`}
>
  <Select
    defaultValue={selectedId}
    onChange={onChange}
  >
    {allCargo.map(c =>  (<Option key={c.cargoId} value={c.cargoId}>{c.name}</Option>))}
  </Select>
  </Form.Item>
}
