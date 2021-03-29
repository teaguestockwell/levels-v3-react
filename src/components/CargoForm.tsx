import { useEffect, useRef } from 'react';
import { Form, Input } from 'antd';
import { CargoString } from '../types/cargo'
import 'antd/dist/antd.css';
import { Const } from '../const'
import { AircraftStore} from '../store/aircraftStore'
import { Aircraft } from '../types/aircraft';
import { CargoStore, CargoStoreState} from '../store/cargoStore';

export const CargoForm = (props: CargoString) => {
  const [form] = Form.useForm();

  // subscribe to state changes with deepScriptEquals
  // on change re-render
  const putCargosIsValid = CargoStore((state) => state.putCargosIsValid)
  const putCargo = CargoStore((state) => state.putCargo)
  
  const validate = () => {
    form.validateFields()
    .then((vals) => {
      console.log('form valid')
      putCargosIsValid(true, props.cargoId)
      // only update valid cargo because invalid cargo because:
      // invalid cargo will not be used,
      // invalid cargo is not type safe
      putCargo({...vals, cargoId: props.cargoId})
    }) 
    .catch((errorInfo) => {
      console.log('form is not valid')
      putCargosIsValid(false, props.cargoId)
    }).finally(() => {
      console.log(cargosValidMapRef.current)
    })
  }
  
  // sub to store state, do not cause re draws
  const currentAirRef = useRef(AircraftStore.getState().selectedAir)
  const cargosValidMapRef = useRef(CargoStore.getState())
  useEffect(() => {
    //subscibe that mutable ref to ALL changes during life of component
    AircraftStore.subscribe(
      (state) => (currentAirRef.current = state as Aircraft),
      // pick a specific part of that state
      (state) => state.selectedAir
    )

    CargoStore.subscribe(
      (state) => (cargosValidMapRef.current = state as CargoStoreState),
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



  return (
    <Form
      key={props.cargoId + '_form'} 
      form={form}
      // do not use onValuesChange() here because is run before form validation
      // solution is touse onChnage of inputs
    >
      <Form.Item
        {...formItemLayout}
        name="name"
        label="Name"
        hasFeedback
        rules={nameRules}
      > 
        <Input placeholder="Please input cargo name" onChange={validate}/>
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
        <Input placeholder="Please input cargo weight" onChange={validate}/>
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
        <Input placeholder="Please input fs" onChange={validate}/> 
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
        <Input placeholder="Please input amount of cargo" onChange={validate}/>
      </Form.Item>
    </Form>
  );
};