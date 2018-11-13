import styled from 'styled-components';
import PrimaryLinkBtn from '../styles/PrimaryLinkBtn';
const Logo = styled.h1`
  color: ${props => props.theme.white};
  font-size: 5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
`;
const Login = styled(PrimaryLinkBtn)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6rem;
  width: 18rem;
  border: none;
  border-radius: 10px;
  color: ${props => props.theme.white};
  background: ${props => props.theme.orange};
  cursor: pointer;
  font-size: 3rem;
  &:first-child {
    margin-right: 3.6rem;
  }
`;

const SignUp = styled(PrimaryLinkBtn)``;
const HeaderWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10rem;
  width: 100%;
  margin: 0 auto;
  padding: 0 6rem;
  color: ${props => props.theme.white};
  background: ${props => props.theme.brown};
  border-bottom: 6px solid ${props => props.theme.black};
`;
const Header = () => (
  <HeaderWrapper>
    <Logo>Adventure Tracker</Logo>
    <ButtonGroup>
      <Login href="/login">Login</Login>
      <SignUp href="/sign-up">Sign-Up</SignUp>
    </ButtonGroup>
  </HeaderWrapper>
);

export default Header;
