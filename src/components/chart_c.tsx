import {Form, Input, Typography} from 'antd'
import {getUserAir} from '../hooks/user_store'
import {useEffect, useRef} from 'react'
import {
  getCargoStringFromChartC,
  getChartCSchema,
  rulesYupWrapper,
} from '../utils/util'
import {userStore, getUserActions} from '../hooks/user_store'
import {Category} from '../types/aircraftDeep'
import {debounce} from 'lodash'
import {Row, Col} from 'antd'
const cs = getUserActions()
const {Text} = Typography

export const ChartC = () => {
  const [form] = Form.useForm()
  const schema = useRef(getChartCSchema(getUserAir())).current
  const air = useRef(getUserAir()).current
  const initCargo = useRef(
    Array.from(userStore.getState().cargoMap.values()).filter(
      (c) => c.category === Category.BasicAircraft
    )
  ).current[0]

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
      initCargo.uuid
    )
    cs.setChartC(newChartC)
    cs.putCargos([cargo])
  }
  const getLabel = (text: string) => (
    <Text
      style={{
        textAlign: 'center',
        color: 'black',
        fontWeight: 'normal',
        fontSize: '12px',
      }}
    >
      {text}
    </Text>
  )
  return (
    <div
      style={{
        margin: '0px 10px 0px 10px',
      }}
    >
      <Form key={air.aircraftId + '_chart_c_form'} form={form}>
        <Row justify="center" style={{paddingLeft: '4px', paddingRight: '4px'}}>
          <Col span={12} style={{paddingRight: '10px'}}>
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
                placeholder={`${Math.ceil(air.weight0/1000)}k-${Math.floor(air.weight1/1000)}k`}
                onChange={debounce(onChange, 500)}
              />
            </Form.Item>
          </Col>
          <Col span={12} style={{paddingLeft: '10px'}}>
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
                placeholder={`${Math.ceil(air.mom0/1000)}k-${Math.floor(air.mom1/1000)}k`}
                />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
