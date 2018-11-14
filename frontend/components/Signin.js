import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';
import {
  Form,
  FormLabel,
  FormHeader,
  FormBox,
  FormGroup,
  FormFieldset,
  FormTitle
} from './styles/FormStyles';
import { PrimaryBtn } from './styles/ButtonStyles';
import styled from 'styled-components';

const LoginBtn = styled(PrimaryBtn)`
  margin: 0 0 0 auto;
`;
const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

class Signin extends Component {
  state = {
    password: '',
    email: ''
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await signup();
              this.setState({ email: '', password: '' });
            }}
          >
            <FormHeader height={'10rem'}>Adventure Tracker</FormHeader>
            <FormFieldset disabled={loading} aria-busy={loading}>
              <FormTitle>Login</FormTitle>
              <Error error={error} />
              <FormGroup>
                <FormLabel htmlFor="email" width={'8rem'}>
                  Email
                </FormLabel>
                <FormBox
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  id="email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="password" width={'10rem'}>
                  Password
                </FormLabel>
                <FormBox
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  id="password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </FormGroup>
              <LoginBtn type="submit">Login</LoginBtn>
            </FormFieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Signin;
