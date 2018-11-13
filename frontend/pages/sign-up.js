import Link from 'next/link';
import styled from 'styled-components';
import Signup from '../components/Signup';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const SignUpPage = () => (
  <div>
    <Columns>
      <Signup />
      <Signup />
      <Signup />
    </Columns>
    <Link href="/triplist">
      <button>Complete</button>
    </Link>
  </div>
);

export default SignUpPage;
