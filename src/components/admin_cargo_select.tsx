import {Row, Select, Typography} from 'antd'
import {adminStore} from '../hooks/admin_store'

const {Text} = Typography

/**
 a nested select for cargo inside of a configuration
 validate param is the function that fires the validation
 of the parent form
 */
export const AdminCargoSelect = ({validate}: {validate: () => void}) => {
  const store = adminStore.getState()
  const cargos = store.air?.cargos ?? []
  const selectedId = store.editObj?.cargoId

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
      name: cargos.find((c) => c.cargoId === newCargoId)?.name,
    })

    // callback to form to revalidate with fresh cargoId
    validate()
  }

  return (
    <>
      <Row justify="start" style={{paddingBottom: '10px'}}>
        <Text>
          When selecting a piece of cargo to insert into a config, the cargo inside of that config has the same weight as the cargo you select.
        </Text>

        <Text style={{paddingTop: 10}}>
            The fuselage station selected overrides the default fuselage station of that cargo.
        </Text>

        <Text style={{paddingTop: 10}}>
            To prevent duplicates, each cargo inserted into a configuration should be unique to that config. For example, instead of inserting 100 separate EPOS into the same config, you should insert one EPOS, give it a quantity of 100, then set the fuselage station to the average of the 100 EPOSs.`
        </Text>
      </Row>

      <Row justify="start">
        <Select
          size={'large'}
          defaultValue={selectedId}
          onChange={onChange}
          style={{width: '100%', textAlign: 'center'}}
          dropdownStyle={{textAlign: 'center'}}
          virtual={true}
          options={
            cargos.map(c => ({
              value: c.cargoId,
              label: c.name
            }))
          }
        />
      </Row>
    </>
  )
}
