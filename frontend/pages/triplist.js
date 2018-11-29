import Link from 'next/link';
import User from '../components/User';
import PleaseLogin from '../components/PleaseLogin';
import TripNote from '../components/TripNote';
import CommonTopNavbar from '../components/CommonTopNavbar';
import MobileNav from '../components/MobileNav';

const TripList = () => (
  <div>
    <CommonTopNavbar />
    <PleaseLogin>
      <User>
        {/* destructure the payload & `me` query */}
        {({ data: { me } }) => {
          if (me) return <p>Welcome {me.name}!</p>;
          return null;
        }}
      </User>
      <p>This is the Trip List page</p>
      <Link href="/">
        <button>Landing Page</button>
      </Link>
      <Link href="/app">
        <button>Sample Trip</button>
      </Link>
      <Link href="/billing">
        <button>Billing</button>
      </Link>
      <Link href="/settings">
        <button>Settings</button>
      </Link>
      <TripNote />
    </PleaseLogin>
    <MobileNav />
  </div>
);

export default TripList;
