import { Map } from '../components/Map';
import gql from 'graphql-tag';
import { withRouter } from 'next/router';

import { Query } from 'react-apollo';
const TRIP_QUERY = gql`
  query getTrip($tripId: ID!) {
    trip(where: { id: $tripId }) {
      startDate
      endDate
      title
    }
  }
`;

const App = props => {
  const tripId = props.router.query.id;
  console.log(tripId);
  return (
    <Query query={TRIP_QUERY} variables={{ tripId }}>
      {({ data, loading, error }) => {
        return <Map data={data} />;
      }}
    </Query>
  );
};

export default withRouter(App);
