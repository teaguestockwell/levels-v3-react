/* eslint-disable @typescript-eslint/no-unused-vars */
import {useEffect, useRef, useState} from 'react'
import {Form, Input, Button, Select} from 'antd'
import {
  capitalizeFirst,
  getEditableKeysOfModel as getEditableKeysOfModelName,
  getModelFromEP,
  rulesYupWrapper,
} from '../util'
import {v4} from 'uuid'
import {getYupModelSchemas} from '../types/aircraftDeep'
import {debounce, throttle} from 'lodash'
import {adminActions} from '../hooks/use_admin_polling'
import { adminStore, getAdminStoreActions } from '../hooks/admin_store'

const as = getAdminStoreActions()

export const AdminForm = ({obj, ep}: {obj: any; ep: string}) => {
  const [form] = Form.useForm()

  const modelName = getModelFromEP(ep)

  const schema = useRef(getYupModelSchemas()[modelName]).current as any
  const [isValid, setIsValid] = useState(false)
  const formKey = useRef(v4()).current

  
  const getIsValid = () =>
  form.getFieldsError().every((v: any) => v.errors.length === 0)
  
  console.log(getIsValid())
  
  useEffect(() => {
    form.setFieldsValue(obj)
    setTimeout(() => {
      form.validateFields()
      setIsValid(getIsValid())
    }, 20)
  }, [])

  const onChange = () => {
    const valid = getIsValid()

    if(!valid){setIsValid(false); return}

    const newObj = {...obj, ...form.getFieldsValue()}
    // remove values that are objects
    const shallowKeys = Object.keys(newObj).filter(
      (k) => typeof obj[k] !== 'object'
    )
    const shallowObj = Object.fromEntries(
      shallowKeys.map((k) => [k, newObj[k]])
    )

    // cast it to the correct type
    const casted = schema.shallowObj.cast(shallowObj)

    as.setEditObj(casted)
    setIsValid(true)
  }

  const onSave = () => {
    adminActions().saveEditModal(
      adminStore.getState().editObj
    )
  }

  return (
    <>
      <Form key={formKey + '_form'} form={form}>
        {getEditableKeysOfModelName(modelName).map((k) => (
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
      <Button onClick={throttle(onSave,500)} block disabled={!isValid}>
        Save
      </Button>
    </>
  )
}
