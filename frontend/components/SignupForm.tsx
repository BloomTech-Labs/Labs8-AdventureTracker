import {Form, Button, Input, Icon} from "antd";
import {useState} from "react";
import {formInputHandler} from "./helpers/functions/index";
import {emailRegex} from "./helpers/regex";
import gql from "graphql-tag";
import {Mutation} from "react-apollo";
import {FormComponentProps} from "antd/lib/form";
import Router from "next/router";

export interface Props extends FormComponentProps {
  isVisible: boolean;
}

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String
    $email: String!
    $password: String!
    $password2: String!
  ) {
    signup(
      name: $name
      email: $email
      password: $password
      password2: $password2
    ) {
      id
      email
      name
    }
  }
`;
const SignUpForm: React.SFC<Props> = ({form, isVisible}) => {
  const {getFieldDecorator, getFieldValue} = form;
  const [passwordsVisible, setPasswordsVisible] = useState(false);

  const [signupInfo, setSignupInfo] = useState({
    email: "",
    password: "",
    password2: "",
    name: "",
  });
  const signupInputHandler = formInputHandler.bind(
    null,
    signupInfo,
    setSignupInfo,
  );

  const submitSignup = (
    e: React.FormEvent<HTMLInputElement>,
    signUpCb: Function,
  ) => {
    e.preventDefault();
    form.validateFields(async (err: any) => {
      if (err) {
        return;
      }
      try {
        const data = await signUpCb();
        if (data) {
          Router.push({
            pathname: "/map",
          });
        }
      } catch (err) {
        console.log(err);
      }
    });
  };
  //@ts-ignore
  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue("password")) {
      callback("Your passwords don't match!");
    } else {
      callback();
    }
  };

  //@ts-ignore
  const validateToNextPassword = (rule, value, callback) => {
    if (value) {
      form.validateFields(["password2"], {force: true});
    }
    callback();
  };
  return (
    <Mutation mutation={SIGNUP_MUTATION} variables={{...signupInfo}}>
      {(signup, {loading}) => (
        <Form
          onSubmit={(e: any) => {
            submitSignup(e, signup);
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
                  <Icon type="mail" style={{color: "rgba(0,0,0,.25)"}} />
                }
                placeholder="Enter Email"
                name="email"
                onChange={signupInputHandler}
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
                {validator: validateToNextPassword},
              ],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{color: "rgba(0,0,0,.25)"}} />
                }
                type={passwordsVisible ? "" : "password"}
                placeholder="Password"
                name="password"
                onChange={signupInputHandler}
                addonAfter={
                  <Icon
                    type={passwordsVisible ? "eye-invisible" : "eye"}
                    style={{cursor: "pointer"}}
                    onClick={() => {
                      setPasswordsVisible(!passwordsVisible);
                    }}
                  />
                }
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password2", {
              rules: [
                {
                  required: true,
                  message: "Please input your Password Again!",
                },
                {validator: compareToFirstPassword},
              ],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{color: "rgba(0,0,0,.25)"}} />
                }
                type="password"
                placeholder="Enter Password again!"
                name="password2"
                onChange={signupInputHandler}
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              SignUp
            </Button>
          </Form.Item>
        </Form>
      )}
    </Mutation>
  );
};
const WrappedSignUpForm = Form.create({name: "signup_form"})(SignUpForm);

export default WrappedSignUpForm;
