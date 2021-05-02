/* eslint-disable @typescript-eslint/no-unused-vars */
import {useLayoutEffect, useMemo, useRef, useState} from 'react'
import {Form, Input, Button } from 'antd'
import {debounce, throttle} from 'lodash'
import {v4} from 'uuid'
import * as util from '../util'
import {getYupModelSchemas} from '../types/aircraftDeep'
import {adminActions} from '../hooks/use_admin_polling'
import { adminStore, getAdminStoreActions } from '../hooks/admin_store'
import { AdminCargoSelect } from './admin_cargo_select'

const as = getAdminStoreActions()

export const AdminForm = () => {
  const [isValid, setIsValid] = useState(false)
  const [form] = Form.useForm()
  const formKey = useRef(v4()).current
  const ep = useRef(adminStore.getState().ep).current
  const modelName = useRef(util.getModelFromEP(ep)).current
  const schema = useRef(getYupModelSchemas()[modelName]).current as any

  const validateAll = () => {
    const isTextInputValid = form.getFieldsError().every((v: any) => v.errors.length === 0)
    // if there is no cargo select, only validate the fields
    if(!ep.includes('configCargo')){
      return isTextInputValid
    }

    const isCargoIdValid = (adminStore.getState().editObj ?? {}).cargoId ? true : false

    // else, both will be validated
    return isTextInputValid && isCargoIdValid
  } 

  // compare validate between current state and old state before setting state
  const setIsValidWrapper = (newValid:boolean) => {
    newValid === isValid ? null : setIsValid(newValid)
  }

  // init validation state
  useLayoutEffect(() => {   
    form.setFieldsValue(adminStore.getState().editObj)
    setTimeout(() => {
      form.validateFields().then(() => setIsValidWrapper(validateAll()))
    }, 1)
  }, [])

  const onChange = () => {
    const newValid = validateAll()

    if(newValid){
      const globalState = adminStore.getState().editObj
      const formFieldState = form.getFieldsValue()
  
      const newStateMergedAndCast = schema.shallowObj.cast({
        ...globalState,
        ...formFieldState
      })

      as.setEditObj(newStateMergedAndCast)
    }

    setIsValidWrapper(newValid)
  }

  const onSave = () => {
    // safe guard while form is still validating and save is still enabled
    if(!validateAll()){return}

    adminActions().saveEditModal()
  }

  const cargoSelect = useMemo(() => {
    return <AdminCargoSelect validate={() => setIsValidWrapper(validateAll())}/>
  },[])

  return (
    <>
        {cargoSelect}
      <Form key={formKey + '_form'} form={form}>
        {util.getEditableKeysOfModel(modelName).map((k) => (
          <Form.Item
            key={formKey + k + 'form_item'}
            name={`${k}`}
            label={`${util.capitalizeFirst(k)}`}
            colon={false}
            rules={util.rulesYupWrapper(schema[k])}
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
      <Button onClick={throttle(onSave,500)} block disabled={!isValid} key={v4()}>
        Save
      </Button>
    </>
  )
}
