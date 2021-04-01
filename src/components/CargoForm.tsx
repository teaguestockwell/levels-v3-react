import {useEffect, useRef} from 'react'
import {Form, Input, Button} from 'antd'
import 'antd/dist/antd.css'
import {Const} from '../const'
import {AirStore} from '../store/aircraftStore'
import {AircraftDeep, Cargo} from '../types/aircraftDeep'
import {CargoStore, CargoStoreState} from '../store/cargoStore'
import { Util } from '../util'

export const CargoForm = (props: Cargo) => {
  const [form] = Form.useForm()

  // this state will never cause re-render because they are actions (functions)
  // array pick
  const [
    deleteCargo,
    deleteCargoIsValid,
    putCargo,
    putCargoIsValid,
  ] = CargoStore((state) => [
    state.deleteCargo,
    state.deleteCargoIsValid,
    state.putCargo,
    state.putCargoIsValid,
  ])

  const validate = () => {
    form
      .validateFields()
      .then((vals) => {
        console.log('form valid')
        putCargoIsValid(true, props.cargoId)
        // only update valid cargo because invalid cargo because:
        // invalid cargo will not be used,
        // invalid cargo is not type safe
        putCargo({...vals, cargoId: props.cargoId})
      })
      .catch((errorInfo) => {
        console.log('form is not valid')
        putCargoIsValid(false, props.cargoId)
      })
      .finally(() => {
        console.log(cargosValidMapRef.current)
      })
  }

  // used to dynamically validate fs and weight
  const airRef = useRef(AirStore.getState().selectedAir as AircraftDeep)
  //used to log cargoStore state on change
  const cargosValidMapRef = useRef(CargoStore.getState())

  useEffect(() => {
    //subscribe that mutable ref to ALL changes during life of component
    AirStore.subscribe(
      (state) => (airRef.current = state as AircraftDeep),
      // pick a specific part of that state
      (state) => state.selectedAir
    )

    CargoStore.subscribe(
      (state) => (cargosValidMapRef.current = state as CargoStoreState),
      (state) => state.cargoValidMap
    )

    form.setFieldsValue(props)
    validate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formItemLayout = {
    // labelCol: {
    //   span: 4,
    // },
    // wrapperCol: {
    //   span: 8,
    // },
  }

  const onDelete = () => {
    deleteCargo(props.cargoId)
    deleteCargoIsValid(props.cargoId)
  }

  return (
    <>
      <Form
        key={props.cargoId + '_form'}
        form={form}
        // do not use onValuesChange() here because is run before form validation
        // solution is to use onChange of inputs
      >
        <Form.Item
          {...formItemLayout}
          name="name"
          label="Name"
          hasFeedback
          rules={Const.NAME_RULES}
        >
          <Input
            size="large"
            placeholder="Please input cargo name"
            onChange={validate}
          />
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          name="weight"
          label="Weight"
          hasFeedback
          rules={[
            ...Const.NUMERIC_RULES,
            {
              validator: (rule,value) => Util.isLessThan(value, airRef.current.cargoWeight1),
              message: `must be less than ${airRef.current.cargoWeight1}`,
            },
          ]}
        >
          <Input
            size="large"
            placeholder="Please input cargo weight"
            onChange={validate}
          />
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          name="fs"
          label="Fuselage Station"
          hasFeedback
          rules={[
            ...Const.NUMERIC_RULES,
            {
              validator: (rule,value) => Util.isGreaterThan(value, airRef.current.fs0),
              message: `must be greater than ${airRef.current.fs0}`,
            },
            {
              validator: (rule,value) => Util.isLessThan(value, airRef.current.fs1),
              message: `must be less than ${airRef.current.fs1}`,
            },
          ]}
        >
          <Input
            size="large"
            placeholder="Please input fs"
            onChange={validate}
          />
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          name="qty"
          label="Quantity"
          hasFeedback
          rules={[
            ...Const.INT_RULES,
            {
              validator: (rule,value) => Util.isGreaterThan(value, 1),
              message: 'must be greater than 0',
            },
          ]}
        >
          <Input
            size="large"
            placeholder="Please input amount of cargo"
            onChange={validate}
          />
        </Form.Item>
      </Form>
      <Button danger onClick={onDelete}>
        Delete
      </Button>
    </>
  )
}
