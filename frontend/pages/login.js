import Link from 'next/link';
import styled from 'styled-components';
import Signin from '../components/Signin';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const Login = () => (
  <div>
    <Columns>
      <Signin />
    </Columns>
    <Link href="/triplist">
      <button>Complete</button>
    </Link>
  </div>
);

export default Login;
