import {Select} from 'antd'
import {Cargo, Category} from '../types/aircraftDeep'
import {getUserAir, getUserSchema,getUserActions} from '../hooks/user_store'
import {getCargoString, getCargoStringFromCargo} from '../utils/util'

const cs = getUserActions()

export const AddASelect = () => {
  const air = getUserAir()
  const schema = getUserSchema().fullObjSchema

  const onChange = (value: string) => {

    if(value === 'Custom'){
      const newEmptyCargo = getCargoString()
      cs.putCargos([newEmptyCargo])
      return
    }

    const oldCargo = air.cargos.find(x => x.name === value) as Cargo
    const newCargo = getCargoStringFromCargo(oldCargo, 1)
    const isValid = schema.isValidSync(newCargo)
    cs.putCargos([{...newCargo, isValid}])
  }

  // render in category order
  const cargos = [
    ...air.cargos.filter(x => x.category === Category.Steward),
    ...air.cargos.filter(x => x.category === Category.Emergency),
    ... air.cargos.filter(x => x.category === Category.Extra)
  ]

  return <Select
    data-testid={`user add adda`}
    onChange={onChange}
    value={'Add Equipment'}
    style={{width: '100%', textAlign: 'center'}}
    dropdownStyle={{textAlign: 'center'}}
    showSearch
    size='large'
    options={
      [
        {
          label: 'Custom',
          value: 'Custom'
        },
        ...cargos.map(c => ({
          label: `${c.category}: ${c.name}`,
          value: c.name
        }))
      ]
    }
/>
}
