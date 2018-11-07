import Link from 'next/link';

const Invoice = () => (
  <div>
    <p>This is the Invoice page</p>
    <Link href="/triplist">
      <button>Trip List</button>
    </Link>
    <Link href="/billing">
      <button>Billing</button>
    </Link>
    <Link href="/settings">
      <button>Settings</button>
    </Link>
  </div>
);

export default Invoice;
