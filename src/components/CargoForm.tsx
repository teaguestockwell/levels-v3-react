import {useEffect} from 'react'
import {Form, Input, Button} from 'antd'
import {Const} from '../const'
import {AirStore} from '../store/aircraftStore'
import {AircraftDeep} from '../types/aircraftDeep'
import {CargoStore} from '../store/cargoStore'
import {isLessThan, isGreaterThan} from '../util'
import {CargoString} from '../types/cargoString'

export const CargoForm = (props: CargoString) => {
  const [form] = Form.useForm()
  // non reactive state because parent component will remove on air change
  const air = AirStore.getState().selectedAir as AircraftDeep

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

      // valid
      .then((vals) => {
        putCargoIsValid(true, props.cargoId)
        putCargo({...props, ...vals})
      })

      // invalid
      .catch((errorInfo) => {
        putCargoIsValid(false, props.cargoId)
        putCargo({...props, ...errorInfo.values})
      })
  }

  useEffect(() => {
    // pass props to form fields
    form.setFieldsValue(props)

    // validate them fields
    form.validateFields()
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
              validator: (rule, value) => isLessThan(value, air.cargoWeight1),
              message: `must be less than ${air.cargoWeight1}`,
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
              validator: (rule, value) => isGreaterThan(value, air.fs0),
              message: `must be greater than ${air.fs0}`,
            },
            {
              validator: (rule, value) => isLessThan(value, air.fs1),
              message: `must be less than ${air.fs1}`,
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
              validator: (rule, value) => isGreaterThan(value, 1),
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
      <Button danger onClick={onDelete} block>
        Delete
      </Button>
    </>
  )
}
