import Link from 'next/link';

const SignUp = () => (
  <div>
    <p>This is the Sign-Up page</p>
    <Link href="/triplist">
      <button>Complete</button>
    </Link>
  </div>
);

export default SignUp;
