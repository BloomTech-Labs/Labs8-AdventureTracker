import Link from 'next/link';
import SettingsComponent from '../components/Settings';
import SideNav from '../components/SideNav';
import CommonTopNavbar from '../components/CommonTopNavbar';
const Settings = () => (
  <div>
    <CommonTopNavbar />
    <p>This is the Settings page</p>
    <SideNav />
    <SettingsComponent />
  </div>
);

export default Settings;
