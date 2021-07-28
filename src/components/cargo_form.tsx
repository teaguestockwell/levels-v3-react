import {useEffect, useRef} from 'react'
import {Form, Input, Button} from 'antd'
import {
  getUserActions,
  getUserCargo,
  getUserAir,
  getUserSchema,
} from '../hooks/user_store'
import {capitalizeFirst, rulesYupWrapper} from '../utils/util'
import debounce from 'lodash/debounce'

const cs = getUserActions()

export const CargoForm = ({uuid}: {uuid: string}) => {
  const [form] = Form.useForm()

  // grab constant values from initial cargo => uuid, category, ok to use ref because form hook state overrides other vals
  const cargo = useRef(getUserCargo(uuid)).current
  const schema = useRef(getUserSchema()).current as any
  const air = useRef(getUserAir()).current

  // set init values and errors.
  // init value and validation inside store is handled in the methods that expose this form
  useEffect(() => {
    form.setFieldsValue(cargo)
    const time = setTimeout(() => form.validateFields(), 1)
    return () => clearTimeout(time)
  }, [])

  const onChange = () => {
    const isValid = form
      .getFieldsError()
      .every((v: any) => v.errors.length === 0)
    const newCargo = {...cargo, ...form.getFieldsValue(), isValid}

    cs.putCargos([newCargo])
  }

  const onDelete = () => {
    cs.deleteCargos([cargo.uuid])
    cs.setEditUuid(undefined)
  }

  // k: k, v: placeholderText
  const editableEntriesOfCargoString = {
    name: 'Please input cargo name',
    weightEA: 'Please input cargo weight',
    fs: `${air.fs0}-${air.fs1}`,
    qty: `Please input cargo qty`,
  }

  return (
    <>
      <Form key={cargo.uuid + '_form'} form={form}>
        {Object.entries(editableEntriesOfCargoString).map((e) => (
          <Form.Item
            key={cargo.uuid + e[0] + 'form_item'}
            name={`${e[0]}`}
            label={`${capitalizeFirst(e[0])}`}
            colon={false}
            rules={rulesYupWrapper(schema[e[0]])}
            hasFeedback
            labelCol={{span: 24}}
          >
            <Input
              size="large"
              placeholder={e[1]}
              onChange={debounce(onChange, 500)}
            />
          </Form.Item>
        ))}
      </Form>
      <Button danger onClick={onDelete} block data-testid="user cargo delete">
        Delete
      </Button>
    </>
  )
}
