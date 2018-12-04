import Link from 'next/link';
import Payment from '../components/Billing';
import MobileNavContainer from '../components/MobileNavContainer';
import SideNav from '../components/SideNav';

const Billing = () => (
  <div>
    <p>This is the Billing page</p>
    <Payment />

    <SideNav />
    <MobileNavContainer />
  </div>
);

export default Billing;
