import {Form, Input, Typography} from 'antd'
import {getAir} from '../hooks/air_store'
import {useEffect, useRef} from 'react'
import {
  getCargoStringFromChartC,
  getChartCSchema,
  rulesYupWrapper,
} from '../util'
import {getActionsCS, getCargoMap} from '../hooks/cargo_store'
import {Category} from '../types/aircraftDeep'
import {debounce} from 'lodash'
import {Row, Col} from 'antd'

const cs = getActionsCS()
const {Text} = Typography

export const ChartC = () => {
  const [form] = Form.useForm()

  const schema = useRef(getChartCSchema(getAir())).current
  const air = useRef(getAir()).current
  const initCargo = useRef(
    Array.from(getCargoMap().values()).filter(
      (c) => c.category === Category.BasicAircraft
    )
  ).current[0]

  useEffect(() => {
    form.setFieldsValue({mom: '', weight: ''})
    const time = setTimeout(() => form.validateFields(), 1)
    return () => clearTimeout(time)
  }, [])

  const onChange = () => {
    const isValid = form
      .getFieldsError()
      .every((v: any) => v.errors.length === 0)

    // convert form input to cargo string, parse moment into fs
    const cargo = getCargoStringFromChartC(
      air.momMultiplyer,
      {...form.getFieldsValue(), isValid},
      initCargo.uuid
    )

    cs.putCargos([cargo])
  }

  const getLabel = (text: string) => (
    <Text
      style={{
        textAlign: 'center',
        color: 'black',
        fontWeight: 'normal',
        fontSize: '16px',
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
        <Row justify="center" gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
          <Col span={12}>
            <Form.Item
              name={`weight`}
              label={getLabel('Basic Weight')}
              colon={false}
              rules={rulesYupWrapper(schema.weight)}
              hasFeedback
            >
              <Input
                size="large"
                //placeholder={`Please input basic weight`}
                onChange={debounce(onChange, 500)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={'mom'}
              label={getLabel('Basic Moment')}
              colon={false}
              rules={rulesYupWrapper(schema.mom)}
              hasFeedback
            >
              <Input
                size="large"
                //placeholder={`Please input basic simple moment`}
                onChange={debounce(onChange, 500)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
