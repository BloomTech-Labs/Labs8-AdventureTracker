import Link from 'next/link';
import { Component } from 'react';
import styled from 'styled-components';
import { GlobeIcon, BillingIcon, SettingsIcon } from './styles/SVGs';
import { withRouter } from 'next/router';

const SidebarWrapper = styled.aside`
  display: flex;
  flex-flow: column;
  width: 100%;
  max-width: 35rem;
  background: ${props => props.theme.opacityblack};
  position: fixed;
  top: 0;
  bottom: 0;
  text-transform: capitalize;
  padding: 5em 2em;
  color: ${props => props.theme.white};
  & > * {
    margin-bottom: 2rem;
  }
  margin: 6rem 0 0 0;
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
  padding: 0 0 0 0.8em;
`;
const SideNavText = styled.h3`
  margin-left: 0.8em;
`;

class SideNav extends Component {
  render() {
    const TRIPLIST = '/triplist';
    const BILLING = '/billing';
    const SETTINGS = '/settings';
    const LENGTH = 40;
    const { route } = this.props.router;
    return (
      <SidebarWrapper>
        <Link href={TRIPLIST}>
          <SideNavBtn active={TRIPLIST.match(route) ? true : false}>
            <GlobeIcon length={LENGTH} />
            <SideNavText>Trips</SideNavText>
          </SideNavBtn>
        </Link>
        <Link href={SETTINGS}>
          <SideNavBtn active={SETTINGS.match(route) ? true : false}>
            <SettingsIcon length={LENGTH} />
            <SideNavText>Settings</SideNavText>
          </SideNavBtn>
        </Link>
        <Link href={BILLING}>
          <SideNavBtn active={BILLING.match(route) ? true : false}>
            <BillingIcon length={LENGTH} />
            <SideNavText>Billing</SideNavText>
          </SideNavBtn>
        </Link>
        <Link href="/app">
          <SideNavBtn>
            <GlobeIcon length={LENGTH} />
            <SideNavText>Map</SideNavText>
          </SideNavBtn>
        </Link>
      </SidebarWrapper>
    );
  }
}

export default withRouter(SideNav);
