import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Router from 'next/router';
import {
  Form,
  FormLabel,
  FormBox,
  FormGroup,
  FormFieldset,
  FormTitle
} from './styles/FormStyles';
import { PrimaryBtn } from './styles/ButtonStyles';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from './User';

const PasswordForm = styled(Form)`
  max-width: 56rem;
  height: 60rem;
  background: ${props => props.theme.grey };
  border-radius: 8px;
`;
const PasswordTitle = styled(FormTitle)`
  color: ${props => props.theme.black};
  line-height: 1;
  font-weight: 700;
`;
const SaveBtn = styled(PrimaryBtn)`
  margin: 0 0 0 auto;
  background: ${props => props.theme.orange};
`;
const CHANGE_PASSWORD_MUTATION = gql`
  mutation CHANGE_PASSWORD_MUTATION($email: String, $password: String) {
    changePassword(email: $email, password: $password) {
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
        mutation={CHANGE_PASSWORD_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(changePassword, { error, loading }) => (
            <PasswordForm>
              <FormFieldset disabled={loading} aria-busy={loading}>
              <PasswordTitle>Change Password</PasswordTitle>
              <FormGroup>
                <FormLabel htmlFor="email" width={'10rem'}>Email</FormLabel>
                <FormBox
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    id="email"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
              </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="oldPassword" width = {"13rem"}>
                    Old Password
                  </FormLabel>
                  <FormBox
                    type="password"
                    name="oldPassword"
                    placeholder="Enter Old Password"
                    id="oldPassword"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="newPassword" width = {"13rem"}>
                    New Password
                  </FormLabel>
                  <FormBox
                    type="password"
                    name="newPassword"
                    placeholder="Enter New Password"
                    id="newPassword"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </FormGroup>
                <SaveBtn type="submit">Save</SaveBtn>
              </FormFieldset>
            </PasswordForm>
        )}
      </Mutation>
    );
  }
}

export default Settings;
