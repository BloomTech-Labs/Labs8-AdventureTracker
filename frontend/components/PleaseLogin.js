import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import Login from './Login';

const PleaseLogIn = props => (
  <Query query={CURRENT_USER_QUERY}
  refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (!data.me) {
        return (
          <div>
            <p>Please Sign In before Continuing</p>
            <Login />
          </div>
        );
      }
      return props.children;
    }}
  </Query>
);

export default PleaseLogIn;
