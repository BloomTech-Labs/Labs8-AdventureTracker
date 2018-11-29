import { Component, Fragment } from 'react';
import styled from 'styled-components';
import MobileNav from './MobileNav';
import { device } from '../lib/device';

const MobileWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: none;
  @media ${device.mobileL} {
    display: flex;
    justify-content: center;
  }
`;

const NavOverlay = styled.div`
  display: ${props => (props.menuActive ? 'flex' : 'none')};
  flex-flow: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: ${props => props.theme.opacityblack};
`;

class MobileNavContainer extends Component {
  state = {
    menuActive: false
  };
  toggleMenu = () => {
    this.setState({ menuActive: !this.state.menuActive });
  };
  render() {
    const { menuActive } = this.state;
    return (
      <MobileWrapper>
        <NavOverlay menuActive={menuActive} />
        <MobileNav toggleMenu={this.toggleMenu} menuActive={menuActive} />
      </MobileWrapper>
    );
  }
}

export default MobileNavContainer;
