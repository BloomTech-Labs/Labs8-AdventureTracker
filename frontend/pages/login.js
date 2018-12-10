import Link from 'next/link';
import styled from 'styled-components';
import Login from '../components/Login';
import { BackgroundImage } from '../components/styles/BackgroundImage';

const LoginPage = () => (
  <div>
    <Login />
    <BackgroundImage src="../static/hiking-girl.jpg" />
  </div>
);

export default LoginPage;
