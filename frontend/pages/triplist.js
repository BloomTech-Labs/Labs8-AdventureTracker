import Link from 'next/link';
import User from '../components/User';
import PleaseLogin from '../components/PleaseLogin';
import TripNote from '../components/TripNote';
import CommonTopNavbar from '../components/CommonTopNavbar';
import MobileNav from '../components/MobileNav';
import MobileNavContainer from '../components/MobileNavContainer';
import SideNav from '../components/SideNav';
import { LgWidthContainer } from '../components/styles/WidthContainers';
import { MainContainer } from '../components/styles/MainContainer';

const TripList = () => (
  <LgWidthContainer>
    <CommonTopNavbar />
    <SideNav />
    <MainContainer>
      <PleaseLogin>
        <User>
          {/* destructure the payload & `me` query */}
          {({ data: { me } }) => {
            if (me) return <p>Welcome {me.name}!</p>;
            return null;
          }}
        </User>
        <Link href="/trip-open">
          <button>
            <TripNote />
          </button>
        </Link>
      </PleaseLogin>
    </MainContainer>
  </LgWidthContainer>
);

export default TripList;
