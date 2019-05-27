import styled from "styled-components";
import {useState, useEffect} from "react";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import {Card, Button, Icon} from "antd";
//@ts-ignore
import homeImg from "static/jumbotron-home.jpg";
//@ts-ignore
import media from "lib/mediaQueries";
//@ts-ignore
import vars from "lib/styles/variables";
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
  const [windowHeight, setWindowHeight] = useState(1000);
  useEffect(() => {
    if (query) {
      setTab(query.start === LOGIN ? LOGIN : SIGNUP);
    }
  }, []);
  useEffect(() => {
    window.addEventListener("resize", getWindowHeight);
    return () => {
      window.removeEventListener("resize", getWindowHeight);
    };
  }, [windowHeight]);
  const getWindowHeight = () => {
    const winHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    console.log(windowHeight);
    setWindowHeight(winHeight);
  };
  return (
    <AuthPageWrapper>
      <Title>Adventure Tracker</Title>
      <AuthCard
        title={
          tab === SIGNUP
            ? `${windowHeight <= 425 ? "Adventure Tracker" : ""} Signup`
            : `${windowHeight <= 425 ? "Adventure Tracker" : ""} Login`
        }
      >
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
  @media screen and (max-width: 500px) {
    font-size: 6rem;
  }
  @media screen and (max-height: 500px) {
    font-size: 4rem;
  }

  @media screen and (max-height: 425px) {
    display: none;
  }
`;

const AuthCard = styled(Card)`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
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
