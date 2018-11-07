import styled from 'styled-components';

const Logo = styled.h1`
  color: #e9e9e9;
  font-size: 5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
`;
const Login = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6rem;
  width: 18rem;
  border: none;
  border-radius: 10px;
  color: #e9e9e9;
  background: #ea6200;
  cursor: pointer;
  font-size: 3rem;
  &:first-child {
    margin-right: 3.6rem;
  }
`;

const SignUp = styled(Login)``;
const HeaderWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10rem;
  width: 100%;
  margin: 0 auto;
  padding: 0 6rem;
  color: #e9e9e9;
  background: #973f00;
  border-bottom: 6px solid #2e2e2e;
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
