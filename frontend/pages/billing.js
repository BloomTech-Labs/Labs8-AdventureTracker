import Link from 'next/link';

const Billing = () => (
  <div>
    <p>This is the Billing page</p>
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

export default Billing;
