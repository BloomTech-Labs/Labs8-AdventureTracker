import React from 'react';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import uuidv4 from 'uuid/v4';
import Router from 'next/router';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from './User';

const FACEBOOKSIGNUP_MUTATION = gql`
  mutation FACEBOOKSIGNUP_MUTATION($facebookID: String!) {
    facebooksignup(facebookID: $facebookID) {
      id
      email
      name
      facebookUser
    }
  }
`;

class FacebookSignup extends React.Component {
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
      <Mutation mutation={FACEBOOKSIGNUP_MUTATION} variables={this.state}>
        {(facebooksignup, { error, loading }) => {
          return (
            <div>
              Loading
              {/* {(async () => {
                await facebooksignup();
                this.setState({ name: '', email: '', password: '', password2: '', step: 1 });
                Router.push({
                  pathname: '/triplist'
                });
              })()} */}
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default FacebookSignup;
