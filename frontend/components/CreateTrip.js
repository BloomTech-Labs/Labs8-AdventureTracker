import React, { Component, Fragment } from 'react';
import { FacebookProvider, LoginButton } from 'react-facebook';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import uuidv4 from 'uuid/v4';
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
const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CreateTripBtn = styled(PrimaryBtn)`
  margin: 0 0 3rem auto;
`;
const CREATE_TRIP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $facebookUser: Boolean!
    $password: String!
    $password2: String!
  ) {
    signup(
      email: $email
      name: $name
      facebookUser: $facebookUser
      password: $password
      password2: $password2
    ) {
      # returned values
      id
      email
      name
      facebookUser
    }
  }
`;

class CreateTrip extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    facebookUser: false,
    passwordMatch: true,
    step: 1
  };

  updateState = e => {
    this.setState({ [e.target.name]: e.target.value }, this.passwordMatch);
  };

  prevStep = () => {
    this.setState({ step: --this.state.step });
  };
  nextStep = () => {
    this.setState({ step: ++this.state.step });
  };
  passwordMatch = () => {
    const { password, password2 } = this.state;
    //Checks if they both have text and if they match or not
    if (password && password2 && password !== password2) {
      this.setState({ passwordMatch: false });
    } else if (password === password2) {
      this.setState({ passwordMatch: true });
    }
  };

  // facebook handlers
  handleResponse = data => {
    console.log(data.profile);
    localStorage.setItem('id', data.profile.id);
    localStorage.setItem('name', data.profile.first_name);
    localStorage.setItem('email', data.profile.email);
    localStorage.setItem('signup', true);
    Router.push({
      pathname: '/facebooksignup'
    });
  };
  handleError = error => {
    this.setState({ error });
  };

  render() {
    const { step, passwordMatch } = this.state;
    return (
      // using the SIGNUP_MUTATION sending the state
      <Mutation mutation={CREATE_TRIP_MUTATION} variables={this.state}>
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
                <FormTitle>Create Trip</FormTitle>
                <CreateTripBtn>Save Trip</CreateTripBtn>
              </FormFieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default CreateTrip;
