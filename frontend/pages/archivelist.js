import Link from 'next/link';
import User from '../components/User';
import CommonTopNavbar from '../components/CommonTopNavbar';
import MobileNav from '../components/MobileNav';
import MobileNavContainer from '../components/MobileNavContainer';
import SideNav from '../components/SideNav';
import { LgWidthContainer } from '../components/styles/WidthContainers';
import { MainContainer } from '../components/styles/MainContainer';
import ArchivedTrips from '../components/ArchiveList';

const ArchiveListPage = () => (
  <LgWidthContainer>
    <CommonTopNavbar />
    <SideNav />
    <MainContainer>
      <ArchivedTrips />
    </MainContainer>
  </LgWidthContainer>
);

export default ArchiveListPage;
