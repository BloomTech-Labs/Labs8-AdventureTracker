import Link from 'next/link';
import Payment from '../components/Billing';
import MobileNavContainer from '../components/MobileNavContainer';
import SideNav from '../components/SideNav';
import CommonTopNavbar from '../components/CommonTopNavbar';
import { LgWidthContainer } from '../components/styles/WidthContainers';

const Billing = () => (
  <LgWidthContainer>
    <CommonTopNavbar />

    <SideNav />
    <Payment />
    <MobileNavContainer />
  </LgWidthContainer>
);

export default Billing;
