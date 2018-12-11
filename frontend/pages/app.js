import { Map } from '../components/Map';
import gql from 'graphql-tag';
import { withRouter } from 'next/router';
import { Query } from 'react-apollo';
import styled from 'styled-components';

const SidebarWrapper = styled.aside`
  display: flex;
  flex-flow: column;
  width: 100%;
  max-width: 35rem;
  background: ${props => props.theme.opacityblack};
  position: fixed;
  top: 0;
  bottom: 0;
  text-transform: capitalize;
  padding: 5em 2em;
  color: ${props => props.theme.white};
  & > * {
    margin-bottom: 2rem;
  }
  margin: 6rem 0 0 0;
`;

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
