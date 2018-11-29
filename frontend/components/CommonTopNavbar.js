import { Component } from 'react';
import { NavbarContainer } from './styles/NavbarContainer';
import { PrimaryBtn } from './styles/ButtonStyles';
import { Mutation } from 'react-apollo';
import { device } from '../lib/device';
import Router from 'next/router';
import styled from 'styled-components';
import gql from 'graphql-tag';
const NavbarWrapper = styled(NavbarContainer)`
  height: 8rem;
  @media ${device.mobile} {
    display: none;
  }
`;
const LOGOUT_MUTATION = gql`
  mutation LOGOUT_MUTATION($message: String) {
    signout(message: $message) {
      message
    }
  }
`;
const Logout = styled(PrimaryBtn)``;

class CommonTopNavbar extends Component {
  state = { message: 'bye' };
  render() {
    return (
      <Mutation mutation={LOGOUT_MUTATION} variables={this.state}>
        {(signout, { error, loading }) => {
          return (
            <NavbarWrapper>
              <Logout
                onClick={async e => {
                  e.preventDefault();
                  await signout();
                  Router.push({
                    pathname: '/'
                  });
                }}
              >
                Logout
              </Logout>
            </NavbarWrapper>
          );
        }}
      </Mutation>
    );
  }
}
export default CommonTopNavbar;
