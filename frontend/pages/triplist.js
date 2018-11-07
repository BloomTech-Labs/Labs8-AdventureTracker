import Link from 'next/link';

const TripList = () => (
  <div>
    <p>This is the Trip List page</p>
    <Link href="/">
      <button>Landing Page</button>
    </Link>
    <Link href="/billing">
      <button>Billing</button>
    </Link>
    <Link href="/settings">
      <button>Settings</button>
    </Link>
  </div>
);

export default TripList;
