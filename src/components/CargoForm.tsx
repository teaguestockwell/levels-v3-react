/* eslint-disable @typescript-eslint/no-unused-vars */
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
      validator: debounce((rule: any, value: any, callback: any) => {
        fieldSchema.validate(value)
        .then(() => callback())
        .catch((e: any) => callback(e))
      },200)
    }
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
    setTimeout(() => form.validateFields(),100)
  }, [])

  // TODO: change this to on submit or on close of modal form is inside of
  const onChange = () => {
      //console.log('onChange')
      const newCargo = {...cargo, ...form.getFieldsValue()}
      //console.log(newCargo)

      const isFormValid = form.getFieldsError().every((v: any) => v.errors.length === 0)
      //console.log(isFormValid)

      cs.putCargosIsValid(
        new Map<string,boolean>([[
          cargo.uuid,
          isFormValid
        ]])
      )

      cs.putCargos([newCargo])

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
              <Input size="large" placeholder={`Please input cargo ${k}`} onChange={debounce(onChange,500)}/>
            </Form.Item>
          ))}
      </Form>
      <Button danger onClick={onDelete} block>
        Delete
      </Button>
    </>
  )
}
