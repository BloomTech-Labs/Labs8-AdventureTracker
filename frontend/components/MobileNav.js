import React, { Component } from 'react';
import styled from 'styled-components';
import { device } from '../lib/device';

const MobileWrapper = styled.nav`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 5rem;
  background: ${props => props.theme.orange};
  @media ${device.mobile} {
    display: flex;
  }
`;

class MobileNav extends Component {
  state = {};
  render() {
    return <MobileWrapper />;
  }
}

export default MobileNav;
