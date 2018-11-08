import Link from 'next/link';
import Signup from '../components/Signup';

const SignUpPage = () => (
  <div>
    <p>This is the Sign-Up page</p>
    <Signup />
    <Link href="/triplist">
      <button>Complete</button>
    </Link>
  </div>
);

export default SignUpPage;
