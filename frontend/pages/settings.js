import Link from 'next/link';
import SettingsComponent from '../components/Settings';
const Settings = () => (
  <div>
    <p>This is the Settings page</p>
    <Link href="/triplist">
      <button>Trip List</button>
    </Link>
    <Link href="/billing">
      <button>Billing</button>
    </Link>
    <Link href="/invoice">
      <button>Invoices</button>
    </Link>
    <Link href="/app">
      <button>Sample Trip</button>
    </Link>
    <SettingsComponent />
  </div>
);

export default Settings;
