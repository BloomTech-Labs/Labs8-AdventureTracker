import styled from 'styled-components';

const BackgroundImage = styled.img`
  /* Set rules to fill background */
  min-height: 100%;
  min-width: 1024px;

  /* Set up proportionate scaling */
  width: 100%;
  height: auto;

  /* Set up positioning */
  position: fixed;
  z-index: -1000;
  top: 0;
  left: 0;
`;

export { BackgroundImage };
