import Link from 'next/link';
import Billing from '../components/Billing';


const BillingPage = () => (
  <div>
    <p>This is the Billing page</p>
    <div>
    <Billing />
  </div>
    <Link href="/triplist">
      <button>Trip List</button>
    </Link>
    <Link href="/settings">
      <button>Settings</button>
    </Link>
    <Link href="/invoice">
      <button>Invoices</button>
    </Link>
  </div>
);

export default BillingPage;
