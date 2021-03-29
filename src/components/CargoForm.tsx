import { useLayoutEffect } from 'react';
import { Form, Input } from 'antd';
import { CargoString } from '../types/cargo'
import 'antd/dist/antd.css';
import { Const } from '../const'

export const CargoForm = (props: CargoString) => {
  const [form] = Form.useForm();

  const validate = () => {
    form.validateFields()
    .then((vals) => console.log(vals)) // on valid
    .catch((errorInfo) => console.log(errorInfo.values)) // on error
  }

  useLayoutEffect(() => {
    form.setFieldsValue(props);
    validate()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
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

  return (
    <Form 
      form={form}
      onValuesChange={()=> validate()}
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
        rules={numericRules}
      >
        <Input placeholder="Please input cargo weight"/>
      </Form.Item>

      <Form.Item
        {...formItemLayout}
        name="fs"
        label="Fuselage Station"
        hasFeedback
        rules={numericRules}
      >
        <Input placeholder="Please input fs"/>
      </Form.Item>

      <Form.Item
        {...formItemLayout}
        name="qty"
        label="Quantity"
        hasFeedback
        rules={intRules}
      >
        <Input placeholder="Please input amount of cargo"/>
      </Form.Item>
    </Form>
  );
};