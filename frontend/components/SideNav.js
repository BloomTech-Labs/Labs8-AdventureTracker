import Link from 'next/link';
import { Component } from 'react';
import styled from 'styled-components';
import { GlobeIcon } from './styles/SVGs';
import { withRouter } from 'next/router';

const SidebarWrapper = styled.aside`
  display: flex;
  flex-flow: column;
  width: 20rem;
  margin: 2rem 0 0 2rem;
  top: 0;
  bottom: 0;
  & > * {
    margin-bottom: 1.3rem;
  }
`;
const SideNavBtn = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 2rem;
  font-weight: 400;
  color: ${props => props.theme.white};
  background: ${props => (props.active ? props.theme.orange : props.theme.blue)};
  border: none;
  cursor: pointer;
`;
const SideNavText = styled.h3`
  margin-left: 1em;
`;

class SideNav extends Component {
  render() {
    const TRIPLIST = '/triplist';
    const BILLING = '/billing';
    const SETTINGS = '/settings';
    const { route } = this.props.router;
    console.log(this.props);
    return (
      <SidebarWrapper>
        <Link href={TRIPLIST}>
          <SideNavBtn active={TRIPLIST.match(route) ? true : false}>
            <GlobeIcon length={30} />
            <SideNavText>Trips</SideNavText>
          </SideNavBtn>
        </Link>
        <Link href={SETTINGS}>
          <SideNavBtn active={SETTINGS.match(route) ? true : false}>
            <GlobeIcon length={30} />
            <SideNavText>Settings</SideNavText>
          </SideNavBtn>
        </Link>
        <Link href={BILLING}>
          <SideNavBtn active={BILLING.match(route) ? true : false}>
            <GlobeIcon length={30} />
            <SideNavText>Billing</SideNavText>
          </SideNavBtn>
        </Link>
        <Link href="/app">
          <SideNavBtn>
            <GlobeIcon length={30} />
            <SideNavText>Map</SideNavText>
          </SideNavBtn>
        </Link>
      </SidebarWrapper>
    );
  }
}

export default withRouter(SideNav);
