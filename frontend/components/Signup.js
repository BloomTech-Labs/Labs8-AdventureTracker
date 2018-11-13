import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      # returned values
      id
      email
      name
    }
  }
`;

class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  };

  updateState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      // using the SIGNUP_MUTATION sending the state
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {/* desctucturing error and loading so we can use them if needed */}
        {(signup, { error, loading }) => {
          return (
            <Form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await signup();
                this.setState({ name: '', email: '', password: '' });
              }}
            >
              {/* updates the bar with loading status */}
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign Up for an Account</h2>
                {/* TODO Clean up error messages */}
                <Error error={error} />
                <label htmlfor="email">
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="enter your email"
                    value={this.state.email}
                    onChange={this.updateState}
                  />
                </label>
                <label htmlfor="name">
                  Name
                  <input
                    type="text"
                    name="name"
                    placeholder="enter your name"
                    value={this.state.name}
                    onChange={this.updateState}
                  />
                </label>
                <label htmlfor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    placeholder="enter your password"
                    value={this.state.password}
                    onChange={this.updateState}
                  />
                </label>
                <button type="submit">Sign Up!</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signup;
