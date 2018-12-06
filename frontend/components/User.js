import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      name
      email
      password
      facebookUser
      facebookID
      permissions
      trip {
        id
        title
        description
        startDate
        endDate
        markers {
          id
          title
          lat
          lng
          status
        }
      }
    }
  }
`;

// build a User component
const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {/* render prop */}
    {payload => props.children(payload)}
  </Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired
};

export default User;
export { CURRENT_USER_QUERY };
