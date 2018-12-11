import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import uuidv4 from 'uuid/v4';
import Router from 'next/router';
import styled from 'styled-components';
import Error from './ErrorMessage';
import { PrimaryBtn } from './styles/ButtonStyles';
import { NavbarContainer } from './styles/NavbarContainer';
import { FacebookIcon } from './styles/SVGs';

const Login = styled(PrimaryBtn)`
  margin: 10px;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;
const NavbarWrapper = styled(NavbarContainer)`
  height: 8rem;
`;

const FACEBOOKSIGNUP_MUTATION = gql`
  mutation FACEBOOKSIGNUP_MUTATION($email: String!, $name: String!, $facebookID: String!) {
    facebooksignup(
      email: $email
      name: $name
      password: ""
      facebookUser: true
      facebookID: $facebookID
      tripCount: 0
      paid: false
    ) {
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
      facebookID: '',
      email: '',
      password: '',
      name: '',
      facebookUser: true,
      tripCount: 0,
      paid: false
    };
  }

  componentDidMount() {
    const id = localStorage.getItem('id');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const password = uuidv4();
    this.setState({
      facebookID: id,
      email,
      name,
      password
    });
  }

  render(props) {
    return (
      <Mutation mutation={FACEBOOKSIGNUP_MUTATION} variables={this.state}>
        {(facebooksignup, { error, loading }) => {
          return (
            <NavbarWrapper>
              <Login
                onClick={async e => {
                  e.preventDefault();
                  await facebooksignup();
                  Router.push({
                    pathname: '/triplist'
                  });
                }}
              >
                <FacebookIcon length={40} />
                &nbsp;{' '}
                {this.props.btnTxt
                  ? this.props.btnTxt
                  : 'Account verified by Facebook, click to continue'}
              </Login>
              <Error error={error} />
            </NavbarWrapper>
          );
        }}
      </Mutation>
    );
  }
}

export default FacebookSignup;
