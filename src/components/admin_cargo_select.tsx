/* eslint-disable @typescript-eslint/no-unused-vars */
import {Row, Select} from 'antd'
import {adminStore, getAdminStoreActions} from '../hooks/admin_store'
import {Typography} from 'antd'

const {Text} = Typography
const {Option} = Select
const as = getAdminStoreActions()

/**
 a nested select for cargo inside of a configuration
 validate param is the function that fires the validation
 of the parent form
 */
export const AdminCargoSelect = ({validate}: {validate: () => void}) => {
  const store = adminStore.getState()
  const cargos = store.air?.cargos ?? []
  const selectedId = store.editObj?.cargoId as any

  if (!store.ep.includes('configCargo')) {
    return null
  }

  if (cargos.length === 0) {
    return <div>Please add cargo to insert into config</div>
  }

  const onChange = (newCargoId: number) => {
    // get fresh state, because this component is memoized, and the
    // form amy have been edited
    store.setEditObj({
      ...adminStore.getState().editObj,
      cargoId: newCargoId,
      name: (cargos.find((c) => c.cargoId === newCargoId) as any).name,
    })

    // callback to form to revalidate with fresh cargoId
    validate()
  }

  return (
    <>
      <Row justify="start" style={{paddingBottom: '10px'}}>
        <Text>
          Select cargo in config: weight defaults to cargo weight, fs overrides
          default cargo fs, cargo must be unique to config
        </Text>
      </Row>
      <Row justify="start">
        <Select
          defaultValue={selectedId}
          onChange={onChange}
          style={{width: 400, textAlign: 'center'}}
          dropdownStyle={{textAlign: 'center'}}
        >
          {cargos.map((c) => (
            <Option key={c.cargoId} value={c.cargoId}>
              {c.name}
            </Option>
          ))}
        </Select>
      </Row>
    </>
  )
}
