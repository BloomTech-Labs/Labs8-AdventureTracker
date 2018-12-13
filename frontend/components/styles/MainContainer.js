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
const MainContainerTwo = styled.div`
  /* display: flex; */
  /* position: relative;  */ 
  /* margin-top: ${props => props.theme.navbarHeight};
  margin-left: ${props => props.theme.sidebarWidth};  */
  height: 25rem;
  margin-left: 70rem;
  margin-top: 50rem;
  @media ${device.tablet} {
    margin: 0 0 0 auto;
    background: pink;
  }
`;

const MainContainerThree = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  margin-top: 3rem;
  /* margin-top: ${props => props.theme.navbarHeight}; */
  /* margin-left: ${props => props.theme.sidebarWidth}; */
  height: 100vh;
  @media ${device.mobile} {
    float: none;
    display: block;
    text-align: left;
    margin-top: 6em;
    background: rgba(0, 0, 0, .2);
  }
  flex-flow: column;
  width: 100%;
  max-width: 35rem;
  background: ${props => props.theme.opacityblack};
  /* background: ${props => props.color}; */
  position: fixed;
  top: 0;
  bottom: 0;
  text-transform: capitalize;
  padding: 2rem 3rem;
  color: ${props => props.theme.white};
  & > * {
    margin-bottom: 2rem;
  }
  margin: 9rem 0 0 0;
`;

export { MainContainer, MainContainerTwo, MainContainerThree };
