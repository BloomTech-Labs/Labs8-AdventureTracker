import Link from 'next/link';
import styled from 'styled-components';
import Login from '../components/Login';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const LoginPage = () => (
  <div>
    <Columns>
      <Login />
    </Columns>
    <Link href="/triplist">
      <button>Complete</button>
    </Link>
  </div>
);

export default LoginPage;
