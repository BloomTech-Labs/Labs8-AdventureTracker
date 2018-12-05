import { Component } from 'react';
import { NavbarContainer } from './styles/NavbarContainer';
import { PrimaryBtn } from './styles/ButtonStyles';
import { Mutation } from 'react-apollo';
import { device } from '../lib/device';
import Router from 'next/router';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import User from './User';
import Breadcrumbs from './Breadcrumbs';
import { withRouter } from 'next/router';
import { LgWidthContainer } from '../components/styles/WidthContainers';

const NavbarWrapper = styled(NavbarContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 11rem;
  max-width: 1400px;
  top: 0;
  position: fixed;
  z-index: 1;
  @media ${device.mobile} {
    display: none;
  }
`;
const Logout = styled(PrimaryBtn)``;

const LOGOUT_MUTATION = gql`
  mutation LOGOUT_MUTATION($message: String) {
    signout(message: $message) {
      message
    }
  }
`;

class CommonTopNavbar extends Component {
  state = { message: 'bye' };
  render() {
    return (
      <div>
        <User>
          {/* destructure the payload & `me` query */}
          {({ data: { me } }) => {
            if (me) {
              return (
                <Mutation
                  mutation={LOGOUT_MUTATION}
                  variables={this.state}
                  // refetchQueries={[{ query: CURRENT_USER_QUERY }]}
                >
                  {(signout, { error, loading }) => {
                    return (
                      <NavbarWrapper>
                        <Breadcrumbs startCrumb={'/'} router={this.props.router} />
                        <Logout
                          onClick={async e => {
                            e.preventDefault();
                            await signout();
                            Router.push({ pathname: '/' });
                          }}
                        >
                          Logout
                        </Logout>
                      </NavbarWrapper>
                    );
                  }}
                </Mutation>
              );
            } else return null;
          }}
        </User>
      </div>
    );
  }
}
export default withRouter(CommonTopNavbar);
