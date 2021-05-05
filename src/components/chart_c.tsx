import React from 'react'
import {Form, Input} from 'antd'
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

const cs = getActionsCS()

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
    setTimeout(() => form.validateFields(), 1)
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

  return (
    <>
      <Form key={air.aircraftId + '_chart_c_form'} form={form}>
        <Form.Item
          name={'mom'}
          label={'Moment'}
          colon={false}
          rules={rulesYupWrapper(schema.mom)}
          hasFeedback
        >
          <Input
            size="large"
            placeholder={`Please input basic simple moment`}
            onChange={debounce(onChange, 500)}
          />
        </Form.Item>
        <Form.Item
          name={`weight`}
          label={`Weight`}
          colon={false}
          rules={rulesYupWrapper(schema.weight)}
          hasFeedback
        >
          <Input
            size="large"
            placeholder={`Please input basic weight`}
            onChange={debounce(onChange, 500)}
          />
        </Form.Item>
      </Form>
    </>
  )
}
