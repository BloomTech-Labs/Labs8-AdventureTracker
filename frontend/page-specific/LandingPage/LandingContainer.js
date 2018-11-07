import styled from 'styled-components';
import Header from './Header';
import InfoPanel from './InfoPanel';

const LandingWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

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

const LandingContainer = () => (
  <LandingWrapper>
    <Header />
    <BackgroundImage src="../../static/LandingPage/hiking-girl.jpg" />
    <InfoPanel />
  </LandingWrapper>
);

export default LandingContainer;
