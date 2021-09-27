import { CustomSelect } from './custom_select'
import  * as Types from '../types'
import {getUserAir, getUserSchema, getUserActions} from '../hooks/user_store'
import {getCargoString, getCargoStringFromCargo} from '../utils/util'

const cs = getUserActions()

export const onChange = (value: string, air:any, schema: any) => {
  if (value === 'Custom') {
    const newEmptyCargo = getCargoString()
    cs.putCargos([newEmptyCargo])
    return
  }

  const oldCargo = air.cargos.find((x:any) => x.name === value) as Types.Cargo
  const newCargo = getCargoStringFromCargo(oldCargo, 1)
  const isValid = schema.isValidSync(newCargo)
  cs.putCargos([{...newCargo, isValid}])
}

export const AddASelect = () => {
  const air = getUserAir()
  const schema = getUserSchema().fullObjSchema


  // render in category order
  const cargos = [
    ...air.cargos.filter((x) => x.category === Types.CargoCategory.Steward),
    ...air.cargos.filter((x) => x.category === Types.CargoCategory.Emergency),
    ...air.cargos.filter((x) => x.category === Types.CargoCategory.Extra),
  ]

  return (
    <CustomSelect
      stateKey="addaselect"
      data-testid={`user add adda`}
      onChange={(value:any) => onChange(value, air, schema)}
      value={'Add Custom Equipment'}
      style={{width: '100%',  display: 'flex', paddingTop: 10}}
      dropdownStyle={{}}
      showSearch
      size="large"
      virtual={true}
      bordered={false}
      options={[
        {
          label: 'Custom',
          value: 'Custom',
          className: 'pad20'
        },
        ...cargos.map((c) => ({
          label: `Custom ${c.name}`,
          value: c.name,
          className: 'pad20'
        })),
      ]}
    />
  )
}
