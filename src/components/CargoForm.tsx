import {useEffect} from 'react'
import {Form, Input, Button} from 'antd'
import {AirStore} from '../hooks/airStore'
import {CargoStore} from '../hooks/cargoStore'
import {capitalizeFirst} from '../util'
import {CargoString} from '../types/cargoString'
import debounce from 'lodash/debounce'

export const CargoForm = (props: CargoString) => {
  // ref to form instance for initial validation
  const [form] = Form.useForm()

  // non reactive state because parent component will remove on air change
  const schema = AirStore.getState().cargoSchema as any

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
  }, [props, form])

  const onChange = (_: any, values: any) => {
    const isFormValid = schema.fullObjSchema.isValidSync(values)

    putCargosIsValid(
      new Map<string, boolean>([[props.uuid, isFormValid]])
    )

    putCargos([{...props, ...values}])
  }

  const onDelete = () => {
    deleteCargos([props.uuid])
    deleteCargosIsValid([props.uuid])
  }

  const rulesYupWrapper = (fieldSchema: any): any[] => {
    return [
      {
        validator(_: any, value: any) {
          try {
            return fieldSchema.validate(value)
          } catch (e) {
            return Promise.reject(new Error(`${e.errors[0]}`))
          }
        },
      },
    ]
  }

  return (
    <>
      <Form
        key={props.uuid + '_form'}
        form={form}
        onValuesChange={debounce(onChange, 300)}
      >
        {Object.keys({
          name: props.name,
          weight: props.weightEach,
          fs: props.fs,
          qty: props.qty,
        }).map((k) => (
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
