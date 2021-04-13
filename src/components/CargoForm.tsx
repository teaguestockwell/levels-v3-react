/* eslint-disable @typescript-eslint/no-unused-vars */
import {useEffect} from 'react'
import {Form, Input, Button} from 'antd'
import {getSchema} from '../hooks/AirStore'
import {getActionsCS, getCargoAtUuid} from '../hooks/CargoStore'
import {capitalizeFirst, rulesYupWrapper} from '../util'
import debounce from 'lodash/debounce'

export const CargoForm = ({uuid}: {uuid: string}) => {
  const cargo = getCargoAtUuid(uuid)
  // ref to form instance for initial validation
  const [form] = Form.useForm()
  // non reactive state because parent component will remove on air change
  const schema = getSchema() as any
  // this state will never cause re-render because they are actions (functions)
  const cs = getActionsCS()

  // set init values and errors.
  // init value and validation inside store is handled in the methods that expose this form
  useEffect(() => {
    form.setFieldsValue(cargo)
    setTimeout(() => form.validateFields(), 1)
  }, [])

  // TODO: change this to on submit or on close of modal form is inside of
  const onChange = () => {
    //console.log('onChange')
    //console.log(newCargo)
    
    const isValid = form
    .getFieldsError()
    .every((v: any) => v.errors.length === 0)
    //console.log(isFormValid)

    const newCargo = {...cargo, ...form.getFieldsValue(), isValid}
    
    cs.putCargos([newCargo])
  }

  const onDelete = () => {
    cs.deleteCargos([cargo.uuid])
  }

  const filterKeys:string[] = ['uuid','category','isValid','isOpen']

  return (
    <>
      <Form key={cargo.uuid + '_form'} form={form}>
        {Object.keys(cargo)
          .filter((k) => !filterKeys.includes(k))
          .map((k) => (
            <Form.Item
              key={k + 'form item'}
              name={`${k}`}
              label={`${capitalizeFirst(k)}`}
              colon={false}
              rules={rulesYupWrapper(schema[k])}
              hasFeedback
            >
              <Input
                size="large"
                placeholder={`Please input cargo ${k}`}
                onChange={debounce(onChange, 500)}
              />
            </Form.Item>
          ))}
      </Form>
      <Button danger onClick={onDelete} block>
        Delete
      </Button>
    </>
  )
}
