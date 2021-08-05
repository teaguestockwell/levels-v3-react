import {Form, Input} from 'antd'
import {useEffect, useRef} from 'react'
import {
  getCargoStringFromChartC,
  getChartCSchema,
  rulesYupWrapper,
} from '../utils/util'
import {userStore, getUserActions, getUserAir} from '../hooks/user_store'
import {debounce} from 'lodash'

const cs = getUserActions()

export const ChartC = () => {
  const [form] = Form.useForm()
  const schema = useRef(getChartCSchema(getUserAir())).current
  const air = useRef(getUserAir()).current

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
  return ( <Form key={air.aircraftId + '_chart_c_form'} form={form} style={{
    margin: '0px 14px',
  }}>
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
                placeholder={`Range: ${Math.ceil(air.weight0 / 1000)}k-${Math.floor(
                  air.weight1 / 1000
                )}k`}
                onChange={debounce(onChange, 500)}
              />
            </Form.Item>

            <Form.Item
              name={'mom'}
              label={getLabel('Basic Moment')}
              colon={false}
              rules={rulesYupWrapper(schema.mom)}
              hasFeedback
              labelCol={{span: 24}}
            >
              <Input
                size="large"
                onChange={debounce(onChange, 500)}
                placeholder={`Range: ${Math.ceil(air.mom0 / 1000)}k-${Math.floor(
                  air.mom1 / 1000
                )}k`}
              />
            </Form.Item>
      </Form>
  )
}
