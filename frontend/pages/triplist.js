import Link from 'next/link';
import User from '../components/User';
import PleaseLogin from '../components/PleaseLogin';

const TripList = () => (
  <div>
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
      <Link href="/billing">
        <button>Billing</button>
      </Link>
      <Link href="/settings">
        <button>Settings</button>
      </Link>
    </PleaseLogin>
  </div>
);

export default TripList;
