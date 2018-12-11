import Link from 'next/link';
import Payment from '../components/Billing';
import MobileNavContainer from '../components/MobileNavContainer';
import SideNav from '../components/SideNav';
import CommonTopNavbar from '../components/CommonTopNavbar';
import { LgWidthContainer } from '../components/styles/WidthContainers';
import styled, { css } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid black;
  height: 95vh;
  margin: 1rem;
  font-size: 2rem;
  & payment-btn {
    align-self: center;
    max-width: 12rem;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Payment1 = styled.div`
  width: 45%;
  height: 45%;
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #cc6600;
  color: black;
  height: 100%;

  ${props =>
    props.main_card &&
    css`
      flex-direction: column;
      h1 {
        padding-bottom: 3rem;
        padding-left: 17rem;
      }

      button {
        margin-top: 2rem;
        padding: 1rem;
        font-size: 1.2rem;
      }
    `}

  ${props =>
    props.indv_card &&
    css`
      height: 25rem;
      background-color: #0099ff;
      border: 1px solid brown;
      padding: 2rem;
    `}

  ${props =>
    props.mid &&
    css`
      height: 30rem;
    `}
`;

const Billing = () => (
  <LgWidthContainer>
    <CommonTopNavbar />
    <SideNav />
    <Container>
      <Card main_card>
        <h1> Create up to three free trips with the free tier. </h1>
        <p>See below for more information on subscription tier.</p>
        <CardContainer>
          <Card indv_card>
            <h2>Paid Tier</h2>
            <ul>
              <li>Unlimited Trip Creation</li>
              <li>Share with unlimited Friends and Family</li>
              <li>Use custom map markers to plot your trip locators</li>
            </ul>
          </Card>
        </CardContainer>
      </Card>
      <Payment className="payment-btn" />
    </Container>
    <MobileNavContainer />
  </LgWidthContainer>
);

export default Billing;
