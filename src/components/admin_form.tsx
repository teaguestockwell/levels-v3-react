/* eslint-disable @typescript-eslint/no-unused-vars */
import {useEffect, useRef, useState} from 'react'
import {Form, Input, Button} from 'antd'
import {capitalizeFirst, rulesYupWrapper} from '../util'
import { v4 } from 'uuid'
import { put1 } from '../services/admin_service'
import { getSchemaOfEP } from '../types/aircraftDeep'
import { debounce } from 'lodash'

export const AdminForm = ({obj,ep} :{obj: Record<string,unknown>, ep:string}) => {
  console.log('admin form')
  console.log(obj)
  const [form] = Form.useForm()
  const schema = useRef(getSchemaOfEP(ep)).current as any
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

  const onSave = () => {
    console.log('saved pressed')
    const newModel = {...obj, ...form.getFieldsValue()}
    console.log(newModel)
    put1(ep,newModel)
  }

  return (
    <>
    <Form key={formKey + '_form'} form={form}>
    {Object.keys(obj)
      .filter((k) => !k.includes('Id') && !k.includes('updated') && !k.includes('updatedBy'))
      .map((k) => (
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
      <Button onClick={onSave} block disabled={!isValid}>
        Save
      </Button>
    </>
  )
}