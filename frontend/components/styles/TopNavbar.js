import styled from 'styled-components';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${props => (props.height ? props.height : '12rem')};
  width: 100%;
  margin: 0 auto;
  padding: 0 6rem;
  color: ${props => props.theme.white};
  background: ${props => props.theme.brown};
`;

export { NavbarContainer };
