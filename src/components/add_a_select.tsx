import {Select} from 'antd'
import  * as Types from '../types'
import {getUserAir, getUserSchema, getUserActions} from '../hooks/user_store'
import {getCargoString, getCargoStringFromCargo} from '../utils/util'

const cs = getUserActions()

export const AddASelect = () => {
  const air = getUserAir()
  const schema = getUserSchema().fullObjSchema

  const onChange = (value: string) => {
    if (value === 'Custom') {
      const newEmptyCargo = getCargoString()
      cs.putCargos([newEmptyCargo])
      return
    }

    const oldCargo = air.cargos.find((x) => x.name === value) as Types.Cargo
    const newCargo = getCargoStringFromCargo(oldCargo, 1)
    const isValid = schema.isValidSync(newCargo)
    cs.putCargos([{...newCargo, isValid}])
  }

  // render in category order
  const cargos = [
    ...air.cargos.filter((x) => x.category === Types.CargoCategory.Steward),
    ...air.cargos.filter((x) => x.category === Types.CargoCategory.Emergency),
    ...air.cargos.filter((x) => x.category === Types.CargoCategory.Extra),
  ]

  return (
    <Select
      data-testid={`user add adda`}
      onChange={onChange}
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
        },
        ...cargos.map((c) => ({
          label: `Custom ${c.name}`,
          value: c.name,
        })),
      ]}
    />
  )
}
