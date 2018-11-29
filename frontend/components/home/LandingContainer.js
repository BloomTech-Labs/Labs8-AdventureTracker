import styled from 'styled-components';
import Header from './Header';
import InfoPanel from './InfoPanel';
import { BackgroundImage } from '../styles/BackgroundImage';

const LandingWrapper = styled.div`
  width: 100%;
`;

const LandingContainer = () => (
  <LandingWrapper>
    <Header />
    <BackgroundImage src={'../../static/hiking-girl.jpg'} />
    <InfoPanel />
  </LandingWrapper>
);

export default LandingContainer;
