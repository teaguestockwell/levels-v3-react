/* eslint-disable @typescript-eslint/no-unused-vars */
import {useEffect, useRef, useState} from 'react'
import {Form, Input, Button} from 'antd'
import {capitalizeFirst, rulesYupWrapper} from '../util'
import { v4 } from 'uuid'
import { getSchemaForEP } from '../types/aircraftDeep'
import { debounce } from 'lodash'

export const AdminForm = ({obj,ep, onSave} :{obj: Record<string,unknown>, ep:string, onSave: (obj:any)=>void}) => {
  const [form] = Form.useForm()
  const filteredEP: any = ep.includes('?') ? ep.split('?')[0] : ep

  const schema = useRef(getSchemaForEP()[filteredEP]).current as any
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
    setIsValid(getIsValid())
  }

  const onSaveLocal = () => {
    const newObj = {...obj, ...form.getFieldsValue()}
    // remove values that are objects
    const shallowKeys = Object.keys(newObj).filter(k => typeof obj[k] !== 'object')
    const shallowObj = Object.fromEntries(shallowKeys.map(k => [k,newObj[k]]))

    // cast it to the correct type
    const casted = schema.shallowObj.cast(shallowObj)

    onSave(casted)
  }

  const fields = Object.keys(obj)
  .filter((k) => !k.includes('Id') && !k.includes('updated') && !k.includes('updatedBy') && typeof obj[k] !== 'object')

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
      <Button onClick={onSaveLocal} block disabled={!isValid}>
        Save
      </Button>
    </>
  )
}