import { Map } from '../components/Map';
import gql from 'graphql-tag';
import { withRouter } from 'next/router';
import { Query } from 'react-apollo';

const TRIP_QUERY = gql`
  query getTrip($tripId: ID!) {
    trip(where: { id: $tripId }) {
      id
      startDate
      endDate
      title
      markers {
        position {
          lat
          lng
        }
        status
      }
    }
  }
`;

const App = props => {
  const tripId = props.router.query.id;
  console.log(tripId);
  if (props.router.query.id) {
    return (
      <Query query={TRIP_QUERY} variables={{ tripId }} refetch>
        {({ data, loading, error }) => {
          if (loading) {
            return <p>{loading}</p>;
          }
          return <Map data={data} />;
        }}
      </Query>
    );
  } else {
    return <Map />;
  }
};

export default withRouter(App);
