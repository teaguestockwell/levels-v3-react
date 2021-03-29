import { useEffect, useLayoutEffect, useRef } from 'react';
import { Form, Input } from 'antd';
import { CargoString } from '../types/cargo'
import 'antd/dist/antd.css';
import { Const } from '../const'
import { AircraftStore} from '../store/aircraftStore'
import { Aircraft } from '../types/aircraft';
import { CargoStore } from '../store/cargoStore';

export const CargoForm = (props: CargoString) => {
  const [form] = Form.useForm();

  // subscribe to state changes with deepScriptEquals
  // on change re-render
  const putCargosIsValid = CargoStore((state) => state.putCargosIsValid)
  
  const validate = () => {
    form.validateFields()
    .then((vals) => {
      console.log('form is valid')
      console.log(vals)
      putCargosIsValid(true, props.cargoId)
    }) 
    .catch((errorInfo) => {
      console.log(errorInfo)
      console.log('form is not valid')
      console.log(errorInfo.values)
      putCargosIsValid(false, props.cargoId)
    })
    console.log(cargosValidMapRef.current)
  }
  
  // sub to store state, do not cause re draws
  const currentAirRef = useRef(AircraftStore.getState().selectedAir)
  const cargosValidMapRef = useRef(CargoStore.getState().cargosValidMap)
  useEffect(() => {
    //subscibe that mutable ref to ALL changes during life of component
    AircraftStore.subscribe(
      (state) => (currentAirRef.current = state as Aircraft),
      // pick a specific part of that state
      (state) => state.selectedAir
    )

    CargoStore.subscribe(
      (state) => (cargosValidMapRef.current = state as Map<string,boolean>),
      (state) => state.cargosValidMap
    )

    form.setFieldsValue(props);
    validate()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const formItemLayout = {
    // labelCol: {
    //   span: 4,
    // },
    // wrapperCol: {
    //   span: 8,
    // },
  };

  const nameRules = [
    {
      max: Const.maxFormLength,
    },
    {
      required: true,
    },
    {
      whitespace: true
    }
  ]

  const numericRules = [
    {
      max: Const.maxFormLength,
    },
    {
      required: true,
    },
    {
      pattern: new RegExp(/^\d*(\.\d+)?$/),
      message: 'must be a positive number'
    },
  ]

  const intRules = [
    {
      max: Const.maxFormLength,
    },
    {
      required: true,
    },
    {
      pattern: new RegExp(/^\d+$/),
      message: 'must be a positive whole number'
    },
  ]

  const isWeightLessThan = async (rule:any,value:any) => {
    if(!value){} // let other rules handle empty string case
    else if(value > (currentAirRef.current as Aircraft).cargoweight1){
      throw new Error()
    }
  }

  const isFSLessThan = async (rule:any,value:any) => {
    if(!value){} // let other rules handle empty string case
    else if(value < (currentAirRef.current as Aircraft).fs0){
      throw new Error()
    }
  }

  const isFSGreaterThan = async (rule:any,value:any) => {
    if(!value){} // let other rules handle empty string case
    else if(value > (currentAirRef.current as Aircraft).fs1){
      throw new Error()
    }
  }

  const isZero = async (rule: any, value:any) => {
    if(!value){} // let other rules handle empty string case
    else if(value === '0'){throw new Error()}
  }

  const onFinsh = (vals:any) => {
    console.log('form in valid')
  }

  return (
    <Form 
      form={form}
      onValuesChange={()=> validate()}
      onFinish={onFinsh}
    >
      <Form.Item
        {...formItemLayout}
        name="name"
        label="Name"
        hasFeedback
        rules={nameRules}
      > 
        <Input placeholder="Please input cargo name" />
      </Form.Item>

      <Form.Item
        {...formItemLayout}
        name="weight"
        label="Weight"
        hasFeedback
        rules={[
          ...numericRules,
          {
            validator: isWeightLessThan,
            message: `must be less than ${(currentAirRef.current as Aircraft).cargoweight1}`
          }
        ]}
      >
        <Input placeholder="Please input cargo weight"/>
      </Form.Item>

      <Form.Item
        {...formItemLayout}
        name="fs"
        label="Fuselage Station"
        hasFeedback
        rules={[
          ...numericRules,
          {
            validator: isFSLessThan,
            message: `must be greater than ${(currentAirRef.current as Aircraft).fs0}`
          },
          {
            validator: isFSGreaterThan,
            message: `must be less than ${(currentAirRef.current as Aircraft).fs1}`
          }
        ]}
      >
        <Input placeholder="Please input fs"/>
      </Form.Item>

      <Form.Item
        {...formItemLayout}
        name="qty"
        label="Quantity"
        hasFeedback
        rules={[
          ...intRules,
          {
            validator: isZero,
            message: 'must not be 0'
          }
        ]}
      >
        <Input placeholder="Please input amount of cargo"/>
      </Form.Item>
    </Form>
  );
};