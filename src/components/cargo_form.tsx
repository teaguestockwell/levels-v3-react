/* eslint-disable @typescript-eslint/no-unused-vars */
import {useEffect, useRef} from 'react'
import {Form, Input, Button} from 'antd'
import {getSchema} from '../hooks/air_store'
import {getActionsCS, getCargoAtUuid} from '../hooks/cargo_store'
import {capitalizeFirst, rulesYupWrapper} from '../util'
import debounce from 'lodash/debounce'

const cs = getActionsCS()

export const CargoForm = ({uuid}: {uuid: string}) => {
  const [form] = Form.useForm()

  // grab constant values from initial cargo => uuid, category, ok to use ref because form hook state overrides other vals
  const cargo = useRef(getCargoAtUuid(uuid)).current
  const schema = useRef(getSchema()).current as any

  // set init values and errors.
  // init value and validation inside store is handled in the methods that expose this form
  useEffect(() => {
    form.setFieldsValue(cargo)
    setTimeout(() => form.validateFields(), 1)
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
    cs.putEditUuid(undefined)
  }

  const filterKeys: string[] = ['uuid', 'category', 'isValid']

  return (
    <>
      <Form key={cargo.uuid + '_form'} form={form}>
        {Object.keys(cargo)
          .filter((k) => !filterKeys.includes(k))
          .map((k) => (
            <Form.Item
              key={cargo.uuid + k + 'form_item'}
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
