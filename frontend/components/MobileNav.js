import React, { Component } from 'react';
import styled from 'styled-components';
import { device } from '../lib/device';
import { HamburgerIcon, ExitIcon } from './styles/SVGs';

const MobileWrapper = styled.nav`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6rem;
  background: ${props => props.theme.orange};
`;
const MenuBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${props => props.theme.orange};
  border: none;
`;

const MobileNav = ({ toggleMenu, menuActive }) => {
  return (
    <MobileWrapper>
      <MenuBtn onClick={toggleMenu}>{menuActive ? <ExitIcon /> : <HamburgerIcon />}</MenuBtn>
    </MobileWrapper>
  );
};

export default MobileNav;
