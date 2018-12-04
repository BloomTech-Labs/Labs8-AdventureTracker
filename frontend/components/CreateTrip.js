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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CreateTripBtn = styled(PrimaryBtn)`
  margin: 0 0 3rem auto;
`;
const CREATE_TRIP_MUTATION = gql`
  mutation CREATE_TRIP_MUTATION(
    $title: String!
    $startDate: String!
    $endDate: String!
    $description: String!
  ) {
    createTrip(title: $title, startDate: $startDate, endDate: $endDate, description: $description) {
      # returned values
      id
      title
      startDate
      endDate
      description
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
        {(createTrip, { error, loading }) => {
          return (
            <Form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await createTrip();
                this.setState({ title: '', startDate: '', endDate: '', description: '' });
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
