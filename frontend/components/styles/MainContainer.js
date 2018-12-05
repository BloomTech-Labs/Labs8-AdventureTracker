import styled from 'styled-components';
import { device } from '../../lib/device';
const MainContainer = styled.div`
  display: flex;
  position: relative;
  margin-top: ${props => props.theme.navbarHeight};
  margin-left: ${props => props.theme.sidebarWidth};
  height: 100vh;
  @media ${device.tablet} {
    margin: 0 0 0 auto;
    background: pink;
  }
`;

export { MainContainer };
