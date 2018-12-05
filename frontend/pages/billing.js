import Link from 'next/link';
import Payment from '../components/Billing';
import MobileNavContainer from '../components/MobileNavContainer';
import SideNav from '../components/SideNav';
import CommonTopNavbar from '../components/CommonTopNavbar';

const Billing = () => (
  <div>
    <CommonTopNavbar />
    <p>This is the Billing page</p>
    <Payment />

    <SideNav />
    <MobileNavContainer />
  </div>
);

export default Billing;
