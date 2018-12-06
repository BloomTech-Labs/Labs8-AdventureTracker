import Link from 'next/link';
import User from '../components/User';
import CommonTopNavbar from '../components/CommonTopNavbar';
import MobileNav from '../components/MobileNav';
import MobileNavContainer from '../components/MobileNavContainer';
import SideNav from '../components/SideNav';
import { LgWidthContainer } from '../components/styles/WidthContainers';
import { MainContainer } from '../components/styles/MainContainer';
import Trips from '../components/TripList';

const TripListPage = () => (
  <LgWidthContainer>
    <CommonTopNavbar />
    <SideNav />
    <MainContainer>
      <Trips />
    </MainContainer>
  </LgWidthContainer>
);

export default TripListPage;
