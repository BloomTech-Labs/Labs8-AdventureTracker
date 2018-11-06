import Link from 'next/link';

const Nav = () => (
  <div>
    <Link href="/test">
      <a>Test</a>
    </Link>
    <Link href="/">
      <a>Home</a>
    </Link>
  </div>
);

export default Nav;
