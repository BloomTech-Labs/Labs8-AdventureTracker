import Link from 'next/link';

const Login = () => (
  <div>
    <p>This is the Login page</p>
    <Link href="/triplist">
      <button>Complete</button>
    </Link>
  </div>
);

export default Login;
