import Link from 'next/link';
import styled from 'styled-components';
import Signup from '../components/Signup';
const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1000;
`;

const SignUpPage = () => (
  <div>
    <Signup />
    <BackgroundImage src="../static/kayaking.jpg" />
  </div>
);

export default SignUpPage;
