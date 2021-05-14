import {Form, Input, Typography} from 'antd'
import {getAir} from '../hooks/air_store'
import {useEffect, useRef} from 'react'
import {
  getCargoStringFromChartC,
  getChartCSchema,
  rulesYupWrapper,
} from '../utils/util'
import {CargoStore, getActionsCS, getCargoMap} from '../hooks/cargo_store'
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
    form.setFieldsValue(CargoStore.getState().chartC)
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
    cs.putChartC(newChartC)
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
        <Row justify="center">
          <Col span={11}>
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
                //placeholder={`Please input basic weight`}
                onChange={debounce(onChange, 500)}
              />
            </Form.Item>
          </Col>
          <Col span={2} />
          <Col span={11}>
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
