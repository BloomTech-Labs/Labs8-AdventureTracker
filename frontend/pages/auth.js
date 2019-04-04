import Auth from "../components/Auth";
import {Button} from "antd";
import {useEffect} from "react";
const AuthenticationPage = () => {
  const auth = new Auth();
  useEffect(() => {
    auth.login();
  }, []);
  return <div />;
};

export default AuthenticationPage;
