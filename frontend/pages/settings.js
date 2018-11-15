import Link from 'next/link';

const Settings = () => (
  <div>
    <p>This is the Settings page</p>
    <Link href="/triplist">
      <button>Trip List</button>
    </Link>
    <Link href="/billing">
      <button>Billing</button>
    </Link>
    <Link href="/invoice">
      <button>Invoices</button>
    </Link>
  </div>
);

export default Settings;
