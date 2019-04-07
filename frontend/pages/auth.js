import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import {Card, Button, Icon} from "antd";
import {useState} from "react";
import styled from "styled-components";
import homeImg from "../static/jumbotron-home.jpg";

const AuthPage = () => {
  const LOGIN = "login";
  const SIGNUP = "signup";
  const [tab, setTab] = useState(LOGIN);
  return (
    <AuthPageWrapper>
      <AuthCard>
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
      <BackgroundImage src={homeImg} />
    </AuthPageWrapper>
  );
};

const Title = styled.h1`
  position: absolute;
  left: 50%;
`;
const AuthPageWrapper = styled.div``;
const BackgroundImage = styled.img`
  /* Set rules to fill background */
  min-height: 100%;
  min-width: 1024px;

  /* Set up proportionate scaling */
  width: 100%;
  height: auto;

  /* Set up positioning */
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1000;
  filter: brightness(50%);
`;
const Twin = styled.div``;
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

export default AuthPage;
