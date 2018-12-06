import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import styled from 'styled-components';
import Error from './ErrorMessage';

import { PrimaryBtn } from './styles/ButtonStyles';
import { NavbarContainer } from './styles/NavbarContainer';
import { FacebookIcon } from './styles/SVGs';
import { FacebookBtn } from './styles/LinkBtnStyles';

const Login = styled(PrimaryBtn)`
  margin: 10px;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;
const NavbarWrapper = styled(NavbarContainer)`
  height: 8rem;
  justify-content: center;
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
                <FacebookIcon length={40} />
                &nbsp; Account verified by Facebook, click to login
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
