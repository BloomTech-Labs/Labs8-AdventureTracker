import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

const ALL_TRIPS_QUERY = gql`
  query ALL_TRIPS_QUERY {
    trips {
      id
      title
      description
    }
  }
`;

const center = styled.div`
  text-align: center;
`;

const TripsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

class Trips extends Component {
  render() {
    return (
      <Center>
        <Query query={ALL_TRIPS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <TripsList>
                {data.trips.map(item => (
                  <p>{trip.title}</p>
                ))}
              </TripsList>
            );
          }}
        </Query>
      </Center>
    );
  }
}

export default Trips;
