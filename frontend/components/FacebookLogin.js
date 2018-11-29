import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import styled from 'styled-components';
import Error from './ErrorMessage';

import { PrimaryBtn } from './styles/ButtonStyles';
import { NavbarContainer } from './styles/NavbarContainer';

const Login = styled(PrimaryBtn)``;
const NavbarWrapper = styled(NavbarContainer)`
  height: 8rem;
`;

const FACEBOOKSIGNIN_MUTATION = gql`
  mutation FACEBOOKSIGNIN_MUTATION($facebookID: String!) {
    facebooksignin(facebookID: $facebookID) {
      id
      email
      name
      facebookUser
    }
  }
`;

class FacebookLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      facebookID: ''
    };
  }

  componentDidMount() {
    const id = localStorage.getItem('id');
    this.setState({
      facebookID: id
    });
  }

  render() {
    return (
      <Mutation mutation={FACEBOOKSIGNIN_MUTATION} variables={this.state}>
        {(facebooksignin, { error, loading }) => {
          return (
            <NavbarWrapper>
              <Login
                onClick={async e => {
                  e.preventDefault();
                  await facebooksignin();
                  Router.push({
                    pathname: '/triplist'
                  });
                }}
              >
                Login
              </Login>
              <Error error={error} />
            </NavbarWrapper>
          );
        }}
      </Mutation>
    );
  }
}

export default FacebookLogin;
