// src/Auth/Auth.js

import auth0 from "auth0-js";
import Router from "next/router";

export default class Auth {
  accessToken;
  idToken;
  expiresAt;
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
    this.auth0 = new auth0.WebAuth({
      domain: "adventure-tracker.auth0.com",
      clientID: process.env.AUTH0_CLIENT_ID,
      redirectUri: "http://localhost:7777",
      responseType: "token id_token",
      scope: "openid",
    });
  }
  handleAuthentication(routeOnSuccess, routeOnFailure) {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult, routeOnSuccess);
      } else if (err) {
        Router.push({
          pathname: routeOnSuccess,
        });
        console.log(err);
        alert(
          `Error: ${err.error}. Check the console for further details.`,
        );
      }
    });
  }
  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }
  setSession(authResult, route) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem("isLoggedIn", "true");

    // Set the time that the access token will expire at
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    // navigate to the home route
    Router.push({
      pathname: route,
    });
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
        alert(
          `Could not get a new token (${err.error}: ${
            err.error_description
          }).`,
        );
      }
    });
  }
  login() {
    this.auth0.authorize();
  }
  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem("isLoggedIn");

    // navigate to the home route
    Router.push({
      pathname: "/auth",
    });
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }
}
