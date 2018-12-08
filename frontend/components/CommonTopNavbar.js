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
const ArchiveBtn = styled(PrimaryBtn)`
  color: ${props => props.theme.black};
  background: ${props => props.theme.lightorange};
`;
const CreateTripBtn = styled(ArchiveBtn)``;
const Logout = styled(PrimaryBtn)``;

const LOGOUT_MUTATION = gql`
  mutation LOGOUT_MUTATION($message: String) {
    signout(message: $message) {
      message
    }
  }
`;

class CommonTopNavbar extends Component {
  constructor() {
    super();
    this.state = { message: 'bye', btnText: 'Go to archived trips', btnGoUrl: '/archivelist' };
  }

  NavButton = LOC => {
    if (LOC.pathname === '/archivelist') {
      this.setState({ btnText: 'Go to Trips', btnGoUrl: '/triplist' });
    } else {
      this.setState({ btnText: 'Go to archived Trips', btnGoUrl: '/archivelist' });
    }
  };

  componentDidMount() {
    this.NavButton(this.props.router);
  }

  render() {
    return (
      <div>
        <Mutation
          mutation={LOGOUT_MUTATION}
          variables={this.state}
          refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        >
          {(signout, { error, loading }) => {
            let LOC = this.props.router;
            console.log('LOC1', LOC);
            return (
              <NavbarWrapper>
                <Breadcrumbs startCrumb={'/'} router={this.props.router} />
                <CreateTripBtn
                  onClick={() => {
                    Router.push({ pathname: '/app' });
                  }}
                >
                  Create Trip
                </CreateTripBtn>
                <ArchiveBtn
                  onClick={() => {
                    this.NavButton(this.props.router);
                    Router.push({ pathname: this.state.btnGoUrl });
                  }}
                >
                  {this.state.btnText}
                </ArchiveBtn>
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
      </div>
    );
  }
}
export default withRouter(CommonTopNavbar);
