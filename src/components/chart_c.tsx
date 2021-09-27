import {Form, Input} from 'antd'
import {useEffect, useRef} from 'react'
import {
  getCargoStringFromChartC,
  getChartCSchema,
  rulesYupWrapper,
} from '../utils/util'
import {userStore, getUserActions, getUserAir} from '../hooks/user_store'
import {debounce} from 'lodash'
import React from 'react'

const cs = getUserActions()

export const ChartC = () => {
  const [form] = Form.useForm()
  const schema = useRef(getChartCSchema(getUserAir())).current
  const air = useRef(getUserAir()).current
  const isFocused0 = useRef(false)
  const isFocused1 = useRef(false)
  
  const showNav = () => {
    if(!process.env.IS_TEST ) (document.getElementsByClassName('mobile-nav')[0]as any).style.visibility = 'visible';
  }

  // cleanup
  React.useEffect(() => {showNav()},[])

  const hideNav = () => {
    if(!process.env.IS_TEST ) (document.getElementsByClassName('mobile-nav')[0]as any).style.visibility = 'hidden';
  }

  const handleNavVis = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      if(isFocused0.current || isFocused1.current) {
        hideNav()
      } else{
        showNav()
      }
    }
  }

  useEffect(() => {
    form.setFieldsValue(userStore.getState().chartC)
    const time = setTimeout(() => form.validateFields(), 1)
    return () => clearTimeout(time)
  }, [])

  const onChange = () => {
    const newChartC = form.getFieldsValue()
    const isValid = form
      .getFieldsError()
      .every((v: any) => v.errors.length === 0)

    // convert form input to cargo string, parse moment into fs
    const cargo = getCargoStringFromChartC(
      air.momMultiplyer,
      {...newChartC, isValid},
      air.aircraftId.toString()
    )
    cs.setChartC(newChartC)
    cs.putCargos([cargo])
  }
  const getLabel = (text: string) => (
    <label
      style={{
        textAlign: 'center',
        color: 'black',
        fontWeight: 'normal',
        fontSize: '12px',
      }}
    >
      {text}
    </label>
  )
  return (<div   data-testid="chart-c">

  <Form key={air.aircraftId + '_chart_c_form'} form={form} style={{
    margin: '0px 14px', marginTop: 0,
    paddingTop: 10,
    paddingBottom: 10,
  }}

  autoComplete="off"
  >
            <Form.Item
              name={`weight`}
              label={getLabel('Basic Weight')}
              colon={false}
              rules={rulesYupWrapper(schema.weight)}
              hasFeedback
              labelCol={{span: 24}}
            >
              <Input
                size="large"
                placeholder={`Basic Weight: ${Math.ceil(air.weight0 / 1000)}k-${Math.floor(
                  air.weight1 / 1000
                )}k`}
                onChange={debounce(onChange, 500)}
                bordered={false}
                style={{paddingLeft: 10}}
                onFocus={() => {isFocused0.current = true; handleNavVis()}}
                onBlur={() => {isFocused0.current = false; handleNavVis()}}
                type="number"
              />
            </Form.Item>

            <div style={{marginTop: 10, marginBottom: 10, borderTop: '1px solid #F1F1F1'}}/>

            <Form.Item
              name={'mom'}
              label={getLabel('Basic Moment')}
              colon={false}
              rules={rulesYupWrapper(schema.mom)}
              hasFeedback
              labelCol={{span: 24}}
              >
              <Input
onFocus={() => {isFocused1.current = true; handleNavVis()}}
onBlur={() => {isFocused1.current = false; handleNavVis()}}

size="large"
onChange={debounce(onChange, 500)}
bordered={false}
placeholder={`Basic Moment: ${Math.ceil(air.mom0 / 1000)}k-${Math.floor(
  air.mom1 / 1000
  )}k`}
  style={{paddingLeft: 10}}
  type="number"
  />
            </Form.Item>
      </Form>
  </div> 
  )
}
