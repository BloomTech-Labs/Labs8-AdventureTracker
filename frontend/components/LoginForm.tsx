import {Form, Button, Input, Icon} from "antd";
import {useState} from "react";
import {formInputHandler} from "./helpers/functions/index";
import {emailRegex} from "./helpers/regex";
import gql from "graphql-tag";
import {Mutation} from "react-apollo";
import {FormComponentProps} from "antd/lib/form";

export interface Props extends FormComponentProps {
  isVisible: boolean;
}

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;
const LoginForm: React.SFC<Props> = ({form, isVisible}) => {
  const {getFieldDecorator} = form;
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const loginInputHandler = formInputHandler.bind(
    null,
    loginInfo,
    setLoginInfo,
  );

  const submitLogin = (
    e: React.FormEvent<HTMLInputElement>,
    loginCb: Function,
  ) => {
    e.preventDefault();
    form.validateFields(async (err: any) => {
      if (err) {
        return;
      }

      const data = await loginCb();
      console.log(data);
    });
  };
  return (
    <Mutation mutation={LOGIN_MUTATION} variables={loginInfo}>
      {(login, {loading}) => (
        <Form
          onSubmit={(e: any) => {
            submitLogin(e, login);
          }}
          style={{display: `${isVisible ? "" : "none"}`}}
        >
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  pattern: emailRegex,
                  message: "This is not a valid email.",
                },
              ],
            })(
              <Input
                prefix={
                  <Icon type="email" style={{color: "rgba(0,0,0,.25)"}} />
                }
                placeholder="Enter Email"
                name="email"
                onChange={loginInputHandler}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{color: "rgba(0,0,0,.25)"}} />
                }
                type="password"
                placeholder="Password"
                name="password"
                onChange={loginInputHandler}
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      )}
    </Mutation>
  );
};
const WrappedLoginForm = Form.create({name: "auth_form"})(LoginForm);

export default WrappedLoginForm;
