import Nav from './Nav';
import styled from 'styled-components';
// imported styled component

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
`;

const Header = () => (
  <div>
    <Nav />
    <Test>S'up? I'm on every page!!</Test>

    <Logo>MUAHAHAA</Logo>
  </div>
);

export default Header;
