import Link from 'next/link';
import Payment from '../components/Billing';
import MobileNavContainer from '../components/MobileNavContainer';

const Billing = () => (
  <div>
    <p>This is the Billing page</p>
    <Payment />
    <Link href="/triplist">
      <button>Trip List</button>
    </Link>
    <Link href="/settings">
      <button>Settings</button>
    </Link>
    <Link href="/invoice">
      <button>Invoices</button>
    </Link>
    <MobileNavContainer />
  </div>
);

export default Billing;
