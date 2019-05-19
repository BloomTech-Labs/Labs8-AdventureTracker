import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import {Card, Button, Icon} from "antd";
import {useState} from "react";
import styled from "styled-components";
import homeImg from "../static/jumbotron-home.jpg";
import {Divider} from "antd";
import media from "lib/mediaQueries";
import Router from "next/router";
import Home from "../components/home/Home";

const AuthPage = () => {
  const LOGIN = "login";
  const SIGNUP = "signup";
  const [tab, setTab] = useState(LOGIN);
  return <Home />;
};
const AuthPageWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 12px;
`;
const Twin = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  margin: 64px auto;
  ${media.phone`
    flex-direction: column-reverse;
  `}
`;
const IntroVideo = styled.iframe`
  padding-top: 400 / 400 * 100%;
  height: 400px;
  width: 100%;
`;
const Title = styled.h1`
  margin-top: 128px;
  text-align: center;
  font-weight: 800;
  font-size: 8rem;
  color: ${props => props.theme.white};
  transform: rotateY(56deg);
  letter-spacing: 1rem;
  line-height: 1;
`;

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
