import Link from 'next/link';
import { Component } from 'react';
import styled from 'styled-components';
import { SideNavBtn } from './styles/ButtonStyles';
import { GlobeIcon } from './styles/SVGs';
import { Router } from 'next/router';
import { fromPromise } from 'apollo-link';
const SidebarWrapper = styled.aside`
  display: flex;
  flex-flow: column;
  width: 20rem;
  height: 50rem;
  & > * {
    margin-bottom: 1.3rem;
  }
  position: fixed;
`;

class SideNav extends Component {
  state = {
    active: ''
  };
  checkActiveLink = () => {};

  render() {
    return (
      <SidebarWrapper>
        <Link href="/triplist">
          <SideNavBtn svgIcon={<GlobeIcon length={'40'} />} text={'Trips'} />
        </Link>
      </SidebarWrapper>
    );
  }
}

export default SideNav;
