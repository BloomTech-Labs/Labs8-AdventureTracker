import styled from "styled-components";
import {useState, useEffect} from "react";

import LoginForm from "../LoginForm";
``;
import SignupForm from "../SignupForm";
import {Card, Button, Icon} from "antd";
//@ts-ignore
import homeImg from "static/jumbotron-home.jpg";
//@ts-ignore
import media from "lib/mediaQueries";

export interface AuthProps {
  router: {
    query: any;
  };
}

const Auth: React.SFC<AuthProps> = props => {
  const {query} = props.router;
  const LOGIN = "login";
  const SIGNUP = "sign-up";
  const [tab, setTab] = useState(SIGNUP);
  useEffect(() => {
    if (query) {
      setTab(query.start === LOGIN ? LOGIN : SIGNUP);
    }
  }, []);
  return (
    <AuthPageWrapper>
      <Title>Adventure Tracker</Title>
      <AuthCard title={tab === SIGNUP ? "Signup" : "Login"}>
        <SignupForm isVisible={tab === SIGNUP ? true : false} />
        <LoginForm isVisible={tab === LOGIN ? true : false} />

        <AuthTabGroup size={"large"}>
          <Tab
            type={tab === SIGNUP ? "primary" : ""}
            onClick={() => setTab(SIGNUP)}
          >
            <Icon type="user-add" />
            Signup
          </Tab>
          <Tab
            type={tab === LOGIN ? "primary" : ""}
            onClick={() => setTab(LOGIN)}
          >
            <Icon type="login" />
            Login
          </Tab>
        </AuthTabGroup>
      </AuthCard>
    </AuthPageWrapper>
  );
};
const AuthPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 12px;
  overflow-y: scroll;
  height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: 800;
  font-size: 8rem;
  color: ${props => props.theme.black};
  transform: rotateY(56deg);
  letter-spacing: 1rem;
  line-height: 1;
`;

const AuthCard = styled(Card)`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
`;
const AuthTabGroup = styled(Button.Group)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;
const Tab = styled(Button)`
  width: 50%;
`;
export default Auth;
