import React from 'react';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import uuidv4 from 'uuid/v4';
import Router from 'next/router';
import styled from 'styled-components';

// const SIGNIN_MUTATION = gql`
//   mutation FACEBOOKSIGNIN_MUTATION($facebookID: String!) {
//     facebooksignin(facebookID: $facebookID) {
//       id
//       email
//       name
//     }
//   }
// `;

// const SIGNUP_MUTATION = gql`
//   mutation FACEBOOKSIGNUP_MUTATION(
//     $email: String!
//     $name: String!
//     $facebookID: String
//     $facebookUser: Boolean!
//   ) {
//     facebooksignup(email: $email, name: $name, facebookID: $facebookID, facebookUser: true, password: uuidv4()) {
//       # returned values
//       id
//       email
//       name
//     }
//   }
// `;

class FacebookLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fbID: '',
      email: '',
      password: '',
      name: '',
      facebookUser: true
    };
  }

  componentDidMount() {
    const id = localStorage.getItem('id');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const password = uuidv4();
    this.setState({
      fbID: id,
      email,
      name,
      password
    });
  }

  render() {
    return (
      <div>
        {console.log('hiya')}
        Hi There {this.state.name}
      </div>
    );
  }
}

export default FacebookLogin;
