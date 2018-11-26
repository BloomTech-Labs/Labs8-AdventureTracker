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
const PasswordBox = styled(FormBox)`
  border: ${props => props.passwordMatch ? "none" : "3px solid red"};
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
    email: '',
    passwordMatch: true,
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value }, () => this.passwordMatch());
  };
  passwordMatch = () => {
    const { oldPassword, newPassword } = this.state;
    // console.log(oldPassword === newPassword)
    //Checks if they both have text and if they match or not
    if(oldPassword && newPassword && oldPassword !== newPassword) {
      this.setState({ passwordMatch: false });
    }
    else if(oldPassword === newPassword) {
      this.setState({ passwordMatch: true });
    }
  }
  render() {
    const { passwordMatch } = this.state;
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
                  <PasswordBox
                    type="password"
                    name="oldPassword"
                    placeholder="Enter Old Password"
                    id="oldPassword"
                    value={this.state.password}
                    passwordMatch={passwordMatch}
                    onChange={(e) => {
                      this.saveToState(e);
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="newPassword" width = {"13rem"}>
                    New Password
                  </FormLabel>
                  <PasswordBox
                    type="password"
                    name="newPassword"
                    placeholder="Enter New Password"
                    id="newPassword"
                    value={this.state.password}
                    passwordMatch={passwordMatch}
                    onChange={(e) => {
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
  }
}

export default Settings;
