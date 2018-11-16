import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
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
import styled from 'styled-components';
import { PrimaryBtn } from './styles/ButtonStyles';
import { FacebookBtn } from './styles/LinkBtnStyles';
import { PrimaryLinkBtn } from './styles/PrimaryLinkBtn';
import Error from './ErrorMessage';
const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;
const BackBtn = styled(PrimaryBtn)`
  background: grey;
  width: 12rem;
`;
const NextBtn = styled(PrimaryBtn)`
  margin: 0 0 3rem auto;
`;
const LoginInsteadBtn = styled(PrimaryLinkBtn)`
  width: 100%;
`;
const SignUpBtn = styled(PrimaryBtn)`
  margin: 0 0 3rem auto;
`;

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
    password: '',
    password2: '',
    step: 1
  };

  updateState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  prevStep = () => {
    this.setState({ step: --this.state.step });
  };
  nextStep = () => {
    this.setState({ step: ++this.state.step });
  };

  render() {
    const { step } = this.state;
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
                this.setState({ name: '', email: '', password: '', password2: '', step: 1 });
                Router.push({
                  pathname: '/triplist'
                });
              }}
            >
              <FormHeader>Adventure Tracker</FormHeader>
              {/* updates the bar with loading status */}
              <FormFieldset disabled={loading} aria-busy={loading}>
                <FormTitle>Sign-Up</FormTitle>
                {/* TODO Clean up error messages */}
                <Error error={error} />
                {/* Using IIFEs for transitioning to the next Sign-up Step and back to previous step*/}
                {(() => {
                  switch (step) {
                    case 1:
                      return (
                        <Fragment>
                          <FormGroup>
                            <FormLabel htmlFor="name" width={'10rem'}>
                              Name
                            </FormLabel>
                            <FormBox
                              type="text"
                              name="name"
                              id="name"
                              placeholder="Enter Name"
                              value={this.state.name}
                              onChange={this.updateState}
                            />
                          </FormGroup>
                          <FormGroup>
                            <FormLabel htmlFor="email" width={'10rem'}>
                              Email
                            </FormLabel>
                            <FormBox
                              type="email"
                              name="email"
                              id="email"
                              placeholder="Enter Email"
                              value={this.state.email}
                              onChange={this.updateState}
                            />
                          </FormGroup>
                        </Fragment>
                      );
                    case 2:
                      return (
                        <Fragment>
                          <FormGroup>
                            <FormLabel htmlFor="password" width={'10rem'}>
                              Password
                            </FormLabel>
                            <FormBox
                              type="password"
                              name="password"
                              id="password"
                              placeholder="Enter Password"
                              value={this.state.password}
                              onChange={this.updateState}
                            />
                          </FormGroup>
                          <FormGroup>
                            <FormLabel htmlFor="password2" width={'15rem'}>
                              Password Again
                            </FormLabel>
                            <FormBox
                              type="password"
                              name="password2"
                              id="password2"
                              placeholder="Re-Enter Password"
                              value={this.state.password2}
                              onChange={this.updateState}
                            />
                          </FormGroup>
                        </Fragment>
                      );
                  }
                })()}

                {(() => {
                  switch (step) {
                    case 1:
                      return <NextBtn onClick={this.nextStep}>Next</NextBtn>;
                    case 2:
                      return (
                        <ButtonGroup>
                          <BackBtn onClick={this.prevStep}>Back</BackBtn>
                          <SignUpBtn type="submit">Sign Up!</SignUpBtn>
                        </ButtonGroup>
                      );
                  }
                })()}
                <FacebookBtn href="https://adventuretracker.now.sh/auth/facebook">
                  Sign-Up with Facebook
                </FacebookBtn>
                <LoginInsteadBtn href="/login">Login instead?</LoginInsteadBtn>
              </FormFieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signup;
