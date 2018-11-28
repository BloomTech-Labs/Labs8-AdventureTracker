import React, { Component, Fragment } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Router from 'next/router';
import { Form, FormLabel, FormBox, FormGroup, FormFieldset, FormTitle } from './styles/FormStyles';
import { PrimaryBtn } from './styles/ButtonStyles';
import styled from 'styled-components';
import User from './User';

const PasswordForm = styled(Form)`
  max-width: 56rem;
  height: 60rem;
  background: ${props => props.theme.grey};
  border-radius: 8px;
`;
const PasswordTitle = styled(FormTitle)`
  color: ${props => props.theme.black};
  line-height: 1;
  font-weight: 700;
`;
const PasswordBox = styled(FormBox)``;
const SaveBtn = styled(PrimaryBtn)`
  margin: 0 0 0 auto;
  background: ${props => props.theme.orange};
`;
const CURRENT_USER_EMAIL_QUERY = gql`
  query {
    me {
      email
    }
  }
`;
const CHANGE_PASSWORD_MUTATION = gql`
  mutation CHANGE_PASSWORD_MUTATION($email: String!, $oldPassword: String!, $newPassword: String!) {
    changePassword(email: $email, oldPassword: $oldPassword, newPassword: $newPassword) {
      id
      email
      name
    }
  }
`;

class Settings extends Component {
  state = {
    oldPassword: '',
    newPassword: ''
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Query query={CURRENT_USER_EMAIL_QUERY}>
        {({ data }) => {
          let email;
          if (data.me === null) {
            email = '';
          } else {
            email = data.me.email;
          }

          // console.log('Email: ', this.state.email, 'My Email: ', myEmail);
          return (
            <Mutation mutation={CHANGE_PASSWORD_MUTATION} variables={{ ...this.state, email }}>
              {(changePassword, { error, loading }) => (
                <PasswordForm
                  method="post"
                  onSubmit={async e => {
                    e.preventDefault();
                    await changePassword();
                    this.setState(
                      {
                        oldPassword: '',
                        newPassword: ''
                      },
                      () => {
                        console.log('success!');
                      }
                    );
                  }}
                >
                  <Error error={error} />
                  <FormFieldset disabled={loading || !email} aria-busy={loading}>
                    <PasswordTitle>Change Password</PasswordTitle>

                    <FormGroup>
                      <FormLabel htmlFor="oldPassword" width={'13rem'}>
                        Old Password
                      </FormLabel>
                      <PasswordBox
                        type="password"
                        name="oldPassword"
                        placeholder="Enter Old Password"
                        id="oldPassword"
                        value={this.state.oldPassword}
                        onChange={e => {
                          this.saveToState(e);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel htmlFor="newPassword" width={'13rem'}>
                        New Password
                      </FormLabel>
                      <PasswordBox
                        type="password"
                        name="newPassword"
                        placeholder="Enter New Password"
                        id="newPassword"
                        value={this.state.newPassword}
                        onChange={e => {
                          this.saveToState(e);
                        }}
                      />
                    </FormGroup>
                    <SaveBtn type="submit">Save</SaveBtn>
                  </FormFieldset>
                </PasswordForm>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default Settings;
