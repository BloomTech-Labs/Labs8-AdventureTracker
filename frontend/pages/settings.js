import Link from 'next/link';
import SettingsComponent from '../components/Settings';
import SideNav from '../components/SideNav';
const Settings = () => (
  <div>
    <p>This is the Settings page</p>
    <SideNav />
    <SettingsComponent />
  </div>
);

export default Settings;
