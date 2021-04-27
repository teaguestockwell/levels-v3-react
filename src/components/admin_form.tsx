/* eslint-disable @typescript-eslint/no-unused-vars */
import {useEffect, useRef, useState} from 'react'
import {Form, Input, Button} from 'antd'
import {capitalizeFirst, rulesYupWrapper} from '../util'
import { v4 } from 'uuid'
import { put1 } from '../services/admin_service'
import { getSchemaOfEP } from '../types/aircraftDeep'
import { debounce } from 'lodash'

export const AdminForm = ({obj,ep, onSave} :{obj: Record<string,unknown>, ep:string, onSave: (obj:any)=>void}) => {
  const [form] = Form.useForm()
  const schema = useRef(getSchemaOfEP(ep.includes('?') ? ep.split('?')[0] : ep)).current as any
  const [isValid, setIsValid] = useState(false)
  const formKey = useRef(v4()).current

  const getIsValid = () => form
    .getFieldsError()
    .every((v: any) => v.errors.length === 0)

  useEffect(() => {
    form.setFieldsValue(obj)
    setTimeout(() => {form.validateFields(); setIsValid(getIsValid()) }, 1)
  }, [])

  const onChange = () => {
      if(getIsValid()){
        setIsValid(true)
      } else {
        setIsValid(false)
      }
  }

  const fields = Object.keys(obj)
  .filter((k) => !k.includes('Id') && !k.includes('updated') && !k.includes('updatedBy') && typeof obj[k] !== 'object')

  console.log(fields)
  return (
    <>
    <Form key={formKey + '_form'} form={form}>
    {
      fields.map((k) => (
        <Form.Item
          key={formKey + k + 'form_item'}
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
      <Button onClick={() => onSave({...obj, ...form.getFieldsValue()})} block disabled={!isValid}>
        Save
      </Button>
    </>
  )
}