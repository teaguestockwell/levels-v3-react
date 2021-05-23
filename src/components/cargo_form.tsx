/* eslint-disable @typescript-eslint/no-unused-vars */
import {useEffect, useRef} from 'react'
import {Form, Input, Button} from 'antd'
import {getUserSchema, userStore} from '../hooks/user_store'
import {getUserActions, getUserCargo} from '../hooks/user_store'
import {capitalizeFirst, rulesYupWrapper} from '../utils/util'
import debounce from 'lodash/debounce'
import { CargoString } from '../types/cargoString'

const cs = getUserActions()

export const CargoForm = ({uuid}: {uuid: string}) => {
  const [form] = Form.useForm()

  // grab constant values from initial cargo => uuid, category, ok to use ref because form hook state overrides other vals
  const cargo = useRef(getUserCargo(uuid)).current
  const schema = useRef(getUserSchema()).current as any

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
              labelCol={{span: 24}}
            >
              <Input
                size="large"
                placeholder={`Please input cargo ${k}`}
                onChange={debounce(onChange, 500)}
              />
            </Form.Item>
          ))}
      </Form>
      <Button danger onClick={onDelete} block data-testid='user cargo delete'>
        Delete
      </Button>
    </>
  )
}
