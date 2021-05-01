/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, Select } from "antd"
import { adminStore, getAdminStoreActions } from "../hooks/admin_store";
const { Option } = Select;

const as = getAdminStoreActions()

/**
 a nested select for cargo inside of a configuration
 validate param is the function that fires the validation
 of the parent form
 */
export const AdminCargoSelect = ({validate}: {validate: () => void}) => {
  const store = adminStore.getState()
  const cargos = store.air?.cargos ?? []
  const selectedId = store.editObj?.cargoId

  if(!store.ep.includes('configCargo')){
    return null
  }

  if(cargos.length === 0){
    return <div>Please add cargo to insert into config</div>
  }
  
  const onChange = (newCargoId:number) => {

    // get fresh state, because this component is memoized, and the 
    // form amy have been edited
    store.setEditObj({
      ...adminStore.getState().editObj,
      cargoId: newCargoId,
      name: (cargos.find(c => c.cargoId === newCargoId)as any).name
    })

    // callback to form to revalidate with fresh cargoId
    validate()
  }

  return <Select
    defaultValue={selectedId}
    onChange={onChange}
  >
    {cargos.map(c =>  (
      <Option 
      key={c.cargoId}
      value={c.cargoId}>{c.name}</Option>
    ))}
  </Select>
}