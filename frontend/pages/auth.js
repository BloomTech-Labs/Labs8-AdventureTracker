import {withRouter} from "next/router";
import {useState, useEffect} from "react";
import Auth from "../components/auth/Auth";
const AuthPage = props => {
  return <Auth router={props.router} />;
};

export default withRouter(AuthPage);
