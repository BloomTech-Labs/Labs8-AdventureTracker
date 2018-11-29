import React, { Component } from 'react';
import styled from 'styled-components';
import { device } from '../lib/device';
import { HamburgerIcon, ExitIcon } from './styles/SVGs';

const MobileWrapper = styled.nav`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6rem;
  background: ${props => props.theme.orange};
  @media ${device.mobile} {
    display: flex;
    justify-content: center;
  }
`;
const MenuBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${props => props.theme.orange};
  border: none;
`;

class MobileNav extends Component {
  state = {
    menuToggle: false
  };
  makeMenuActive = () => {
    this.setState({ menuToggle: !this.state.menuToggle });
  };
  render() {
    const { menuToggle } = this.state;
    console.log(menuToggle);
    return (
      <MobileWrapper>
        <MenuBtn onClick={this.makeMenuActive}>
          {menuToggle ? <ExitIcon /> : <HamburgerIcon />}
        </MenuBtn>
      </MobileWrapper>
    );
  }
}

export default MobileNav;
