import Link from 'next/link';
import User from '../components/User';
import PleaseLogin from '../components/PleaseLogin';
import TripNote from '../components/TripNote';
import CommonTopNavbar from '../components/CommonTopNavbar';
import MobileNav from '../components/MobileNav';
import MobileNavContainer from '../components/MobileNavContainer';
import SideNav from '../components/SideNav';

const TripList = () => (
  <div>
    <CommonTopNavbar />
    <SideNav />
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
        <button>Home</button>
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
      <Link href="/new-trip">
        <button>Create New Trip</button>
      </Link>
      <Link href="/trip-open">
        <button>
          <TripNote />
        </button>
      </Link>
    </PleaseLogin>
  </div>
);

export default TripList;
