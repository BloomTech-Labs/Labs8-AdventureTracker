import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Router from 'next/router';
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
import { CURRENT_USER_QUERY } from './User';
const EmailForm = styled(Form)`
  max-width: 52rem;
`;
const PasswordForm = styled(Form)`
  max-width: 52rem;
`;
const SaveBtn = styled(PrimaryBtn)`
  margin: 0 0 0 auto;
`;
const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION($email: String, $password: String) {
    updateUser(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

class Settings extends Component {
  state = {
    oldPassword: '',
    newPassword: '',
    email: ''
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation
        mutation={UPDATE_USER_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(updateUser, { error, loading }) => (
          <Fragment>
            <EmailForm
              method="update"
              onSubmit={async e => {
                e.preventDefault();
                await updateUser();
                this.setState({ email: '', oldPassword: '', newPassword: '' });
              }}
            >
              <FormHeader>Change Email</FormHeader>
              <FormFieldset disabled={loading} aria-busy={loading}>
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
              </FormFieldset>
            </EmailForm>
            <PasswordForm>
              <FormHeader>Change Password</FormHeader>
              <FormFieldset disabled={loading} aria-busy={loading}>
                <FormGroup>
                  <FormLabel htmlFor="oldPassword" width={'10rem'}>
                    Password
                  </FormLabel>
                  <FormBox
                    type="password"
                    name="oldPassword"
                    placeholder="Old Password"
                    id="oldPassword"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="newPassword" width={'10rem'}>
                    Password
                  </FormLabel>
                  <FormBox
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    id="newPassword"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </FormGroup>
                <SaveBtn type="submit">Save</SaveBtn>
              </FormFieldset>
            </PasswordForm>
          </Fragment>
        )}
      </Mutation>
    );
  }
}

export default Settings;
