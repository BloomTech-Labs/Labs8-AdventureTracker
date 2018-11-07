import styled from 'styled-components';

const InfoPanelWrapper = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 40%;
  padding: 0 5rem;
  background: rgba(29, 27, 27, 51%);
  text-transform: capitalize;
  z-index: -10;
  color: #e9e9e9;
`;
const Info = styled.p`
  font-size: 3.2rem;
  margin-bottom: 3.2rem;
  line-height: 4rem;
  &:first-child {
    margin-top: 13rem;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;
const BoldWord = styled.strong`
  font-weight: 600;
`;
const BuyBtn = styled.button`
  color: #e9e9e9;
  background: #d10000;
  height: 12rem;
  width: 100%;
  text-transform: capitalize;
  border: none;
  border-radius: 3px;
  font-size: 5rem;
  cursor: pointer;
`;
const InfoPanel = () => (
  <InfoPanelWrapper>
    <Info>
      <BoldWord>Plan</BoldWord> an adventure no matter how big or small
    </Info>
    <Info>
      <BoldWord>Update</BoldWord> Friends and Family on where you are
    </Info>
    <Info>
      <BoldWord>Find</BoldWord> the best routes for your journey
    </Info>
    <BuyBtn>Buy Now</BuyBtn>
  </InfoPanelWrapper>
);

export default InfoPanel;
