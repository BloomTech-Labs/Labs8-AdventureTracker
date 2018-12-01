import Link from 'next/link';
import User from '../components/User';
import PleaseLogin from '../components/PleaseLogin';
import TripNote from '../components/TripNote';
import CommonTopNavbar from '../components/CommonTopNavbar';
import MobileNav from '../components/MobileNav';
import MobileNavContainer from '../components/MobileNavContainer';

const TripOpen = () => (
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
        <p>This is the Trip Open page</p>
        <Link href="/">
          <button>Home</button>
        </Link>
        <Link href="/app">
          <button>Sample Trip</button>
        </Link>
        <Link href="/billing">
          <button>Billing</button>
        </Link>
        <Link href="/triplist">
          <button>TripList</button>
        </Link>
        <Link href="/settings">
          <button>Settings</button>
        </Link>
        <TripNote />
      </PleaseLogin>
    </div>
  );
  
  export default TripOpen;