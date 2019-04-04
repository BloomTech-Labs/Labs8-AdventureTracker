// src/Auth/Auth.js

import auth0 from "auth0-js";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: "adventure-tracker.auth0.com",
    clientID: process.env.AUTH0_CLIENT_ID,
    redirectUri: "http://localhost:7777",
    responseType: "token id_token",
    scope: "openid",
  });

  login() {
    this.auth0.authorize();
  }
}
