import {useEffect} from 'react'
import {Form, Input, Button } from 'antd'
import {Const} from '../const'
import {AirStore} from '../store/airStore'
import {AircraftDeep} from '../types/aircraftDeep'
import {CargoStore} from '../store/cargoStore'
import {isLessThan, isGreaterThan, CargoSchema } from '../util'
import {CargoString} from '../types/cargoString'

  interface Value {
    touched: boolean
    validating: boolean
    errors: Array<string>
    name: Array<string>
    value: string
  }

export const CargoForm = (props: CargoString) => {
  // ref to form instance for initial validation
  const [form] = Form.useForm()

  // non reactive state because parent component will remove on air change
  const airState = AirStore.getState()
  const air = airState.selectedAir as AircraftDeep
  const schema = airState.cargoSchema as CargoSchema

  // this state will never cause re-render because they are actions (functions)
  const [
    deleteCargos,
    deleteCargosIsValid,
    putCargos,
    putCargosIsValid,
  ] = CargoStore((state) => [
    state.deleteCargos,
    state.deleteCargosIsValid,
    state.putCargos,
    state.putCargosIsValid,
  ])

  // set init values and errors. 
  // init value and validation inside store is handled in the methods that expose this form
  useEffect(() => {
    form.setFieldsValue(props)
    form.validateFields()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addToCargoStore = (changedFields: any, allFields: any) => {
    const allFieldsTyped = allFields as  & Value[]
    const isFormValid = allFieldsTyped.every(v => v.errors.length === 0)

    putCargosIsValid(
      new Map<string,boolean>([[
        props.uuid,
        isFormValid
      ]])
    )

    putCargos([{
      uuid: props.uuid,
      category: props.category,
      name: allFieldsTyped[0].value,
      weight: allFieldsTyped[1].value,
      fs: allFieldsTyped[2].value,
      qty: allFieldsTyped[3].value,
    }])
  }

  const rulesYupWrapper = (fieldSchema:any):any[] =>{
    return [{
      validator(_:any, value:any) {
        try{
          fieldSchema.validateSync(value)
          return Promise.resolve();
        }catch(e){
          return Promise.reject(new Error(`${e.errors[0]}`));
        }
      },
    }]
  }


  const formItemLayout = {
    // labelCol: {
    //   span: 4,
    // },
    // wrapperCol: {
    //   span: 8,
    // },
  }

  const onDelete = () => {
    deleteCargos([props.uuid])
    deleteCargosIsValid([props.uuid])
  }

  return (
    <>
      <Form
        key={props.uuid + '_form'}
        form={form}
        onFieldsChange={addToCargoStore}
      >
        <Form.Item
          {...formItemLayout}
          name="name"
          label="Name"
          hasFeedback
          rules={rulesYupWrapper(schema.name)}
        >
          <Input
            size="large"
            placeholder="Please input cargo name"
          />
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          name="weight"
          label="Weight"
          hasFeedback
          rules={rulesYupWrapper(schema.weight)}
        >
          <Input
            size="large"
            placeholder="Please input cargo weight"
          />
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          name="fs"
          label="Fuselage Station"
          hasFeedback
          rules={rulesYupWrapper(schema.fs)}
        >
          <Input
            size="large"
            placeholder="Please input fs"
          />
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          name="qty"
          label="Quantity"
          hasFeedback
          rules={rulesYupWrapper(schema.qty)}
        >
          <Input
            size="large"
            placeholder="Please input amount of cargo"
          />
        </Form.Item>
      </Form>
      <Button danger onClick={onDelete} block>
        Delete
      </Button>
    </>
  )
}
