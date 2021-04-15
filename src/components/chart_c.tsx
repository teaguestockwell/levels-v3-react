import { Form, Input } from "antd";
import { getAir } from "../hooks/air_store";
import { useEffect, useRef } from 'react'
import { getCargoStringFromChartC, getChartCSchema, rulesYupWrapper } from "../util";
import { getActionsCS } from "../hooks/cargo_store";
import { Category } from "../types/aircraftDeep";
import { v4 } from "uuid";
import { debounce } from "lodash";
import { CargoString } from "../types/cargoString";

const cs = getActionsCS()

export const ChartC = () => {
  const [form] = Form.useForm()
  
  const initCargo: CargoString = useRef({
    name: 'Basic Aircraft',
    weightEA: '0',
    fs: '0',
    qty: '1',
    isValid: false,
    uuid: v4(),
    category: Category.BasicAircraft 
  }).current
  const schema = useRef(getChartCSchema(getAir())).current
  const air = useRef(getAir()).current

  useEffect(() => {
    cs.putCargos([initCargo])
    form.setFieldsValue({mom: '', weight: ''})
    setTimeout(() => form.validateFields(), 1)
  }, [])

  const onChange = () => {
    const isValid = form.getFieldsError().every((v: any) => v.errors.length === 0)

    // convert form input to cargo string, parse moment into fs
    const cargo = getCargoStringFromChartC(air.momMultiplyer,{...form.getFieldsValue(),isValid}, initCargo.uuid)
    
    cs.putCargos([cargo])
  }

  return (
      <>
        <Form key={'chart c form'} form={form}>
              <Form.Item
                key={'chart c basic simple moment'}
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
              key={'chart c weight'}
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