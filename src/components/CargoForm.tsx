import {useEffect} from 'react'
import {Form, Input, Button} from 'antd'
import {AirStore} from '../hooks/airStore'
import {CargoStore, selectActionsCS} from '../hooks/cargoStore'
import {capitalizeFirst} from '../util'
import {CargoString} from '../types/cargoString'
import debounce from 'lodash/debounce'

const rulesYupWrapper = (fieldSchema: any): any[] => {
  return [
    {
      validator(_: any, value: any) {
        console.log('validating')
        try {
          return fieldSchema.validate(value)
        } catch (e) {
          return Promise.reject(new Error(`${e.errors[0]}`))
        }
      },
    },
  ]
}

export const CargoForm = ({cargo}: {cargo: CargoString}) => {
  // ref to form instance for initial validation
  const [form] = Form.useForm()
  // non reactive state because parent component will remove on air change
  const schema = AirStore.getState().cargoSchema as any
  // this state will never cause re-render because they are actions (functions)
  const cs = CargoStore(selectActionsCS)

  // set init values and errors.
  // init value and validation inside store is handled in the methods that expose this form
  useEffect(() => {
    form.setFieldsValue(cargo)
    setTimeout(() => form.validateFields(),500)
  }, [])

  const onChange = (changedFields: any, allFields: any) => {
    console.log('on change')
    const isFormValid = allFields.every((v: any) => v.errors.length === 0)

    cs.putCargosIsValid(
      new Map<string,boolean>([[
        cargo.uuid,
        isFormValid
      ]])
    )

    cs.putCargos([{
      uuid: cargo.uuid,
      category: cargo.category,
      name: allFields[0].value,
      weightEA: allFields[1].value,
      fs: allFields[2].value,
      qty: allFields[3].value,
    }])
  }

  const onDelete = () => {
    cs.deleteCargos([cargo.uuid])
    cs.deleteCargosIsValid([cargo.uuid])
  }

  return (
    <>
      <Form
        key={cargo.uuid + '_form'}
        form={form}
        onFieldsChange={debounce(onChange, 300)}
      >
        {Object.keys(cargo)
          .filter((k) => k !== 'uuid' && k !== 'category')
          .map((k) => (
            <Form.Item
              key={k + 'form item'}
              name={`${k}`}
              label={`${capitalizeFirst(k)}`}
              colon={false}
              rules={rulesYupWrapper(schema[k])}
              hasFeedback
            >
              <Input size="large" placeholder={`Please input cargo ${k}`} />
            </Form.Item>
          ))}
      </Form>
      <Button danger onClick={onDelete} block>
        Delete
      </Button>
    </>
  )
}
