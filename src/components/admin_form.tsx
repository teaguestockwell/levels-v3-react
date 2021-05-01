/* eslint-disable @typescript-eslint/no-unused-vars */
import {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
import {Form, Input, Button, Select} from 'antd'
import {
  capitalizeFirst,
  getEditableKeysOfModel as getEditableKeysOfModelName,
  getModelFromEP,
  removeNestedObj,
  rulesYupWrapper,
} from '../util'
import {v4} from 'uuid'
import {getYupModelSchemas} from '../types/aircraftDeep'
import {debounce, throttle} from 'lodash'
import {adminActions} from '../hooks/use_admin_polling'
import { adminStore, getAdminStoreActions } from '../hooks/admin_store'
import { AdminCargoSelect } from './admin_cargo_select'

const as = getAdminStoreActions()

export const AdminForm = ({obj, ep}: {obj: any; ep: string}) => {
  const [form] = Form.useForm()
  const [isValid, setIsValid] = useState(false)
  const formKey = useRef(v4()).current

  const modelName = getModelFromEP(ep)
  const schema = useRef(getYupModelSchemas()[modelName]).current as any

  
  const getIsValid = () => {
    // if there is no cargo select, only validate the fields
    if(!ep.includes('configCargo')){
      return form.getFieldsError().every((v: any) => v.errors.length === 0)
    }

    const fields  = form.getFieldsError().every((v: any) => v.errors.length === 0)
    const cargoId = (adminStore.getState().editObj as any).cargoId
    
    // else, both will be validated
    if(fields && cargoId){
      return true
    }

    return false
  }
  
  const validateCallback = () => {
    console.log('admin form validate callback')
    const newValid = getIsValid()
    newValid === isValid ? null : setIsValid(newValid)
  }

  
  useLayoutEffect(() => {   
    form.setFieldsValue(obj)
    setTimeout(() => {

      if(ep.includes('configCargo') && adminStore.getState().editObj?.cargoId  != obj.cargoId){
        as.setEditObj(obj)
      }

      form.validateFields().then(() =>
        setIsValid(getIsValid())
      )
    }, 1)
  }, [])

  const onChange = () => {
    const validField = form.getFieldsError().every((v: any) => v.errors.length === 0)
    if(validField){
      const shallowObj = removeNestedObj(
        {
          ...obj,
          ...form.getFieldsValue()
        }
      )
      
      // cast it to the correct type
      const casted = schema.shallowObj.cast(shallowObj)
  
      if(ep.includes('configCargo')){
        const cargoId = adminStore.getState().editObj?.cargoId
        as.setEditObj({...casted, cargoId})
      } else{
        as.setEditObj(casted)
      }
    }
    

    validateCallback()
  }

  const onSave = () => {
    console.log('on save admin form')
    // safe guard while form is still validating and save is still enabled
    if(!getIsValid()){return}

    // nested props like name may not be inside of edit store, add them in
    adminActions().saveEditModal(
      {...obj,...adminStore.getState().editObj}
    )
  }

  const cargoSelect = useMemo(() => {
    return <AdminCargoSelect validate={validateCallback}/>
  },[ep,obj])

  return (
    <>
      {cargoSelect}
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
      <Button onClick={throttle(onSave,500)} block disabled={!isValid} key={v4()}>
        Save
      </Button>
    </>
  )
}
