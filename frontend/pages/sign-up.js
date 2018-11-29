import Link from 'next/link';
import styled from 'styled-components';
import Signup from '../components/Signup';
import { BackgroundImage } from '../components/styles/BackgroundImage';

const SignUpPage = () => (
  <div>
    <Signup />
    <BackgroundImage src="../static/kayaking.jpg" />
  </div>
);

export default SignUpPage;
