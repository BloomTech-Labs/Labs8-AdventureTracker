import {Form, Button} from "antd";
import {useEffect, useState} from "react";
import {Input} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {formInputHandler} from "../../../helpers/functions";

export interface ContactFormProps {
  form: any;
}

const ContactForm: React.SFC<ContactFormProps> = ({form}) => {
  const {getFieldDecorator} = form;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item label="Name">
        {getFieldDecorator("name", {})(<Input size="large" />)}
      </Form.Item>
      <Form.Item label="E-mail">
        {getFieldDecorator("email", {
          rules: [
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ],
        })(<Input size="large" />)}
      </Form.Item>
      <Form.Item label="Message">
        {getFieldDecorator("message", {})(<TextArea rows={5} />)}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedContactForm = Form.create({name: "contact"})(ContactForm);
export default WrappedContactForm;
