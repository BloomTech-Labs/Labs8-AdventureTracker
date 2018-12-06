import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import TripNote from './TripNote';
import { CURRENT_USER_QUERY } from './User';

const Center = styled.div`
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
        {/* added refetchQueries to see if shows new trip when pushed to /triplist */}
        {/* <Query query={CURRENT_USER_QUERY} refetchQueries={[{ query: CURRENT_USER_QUERY }]}> */}
        <Query query={CURRENT_USER_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <TripsList>
                <TripNote key="1" title="North Pole" start="12/24/18" end="12/25/18" />
                {data.me !== null
                  ? data.me.trip.map(trip => (
                      <TripNote
                        key={trip.id}
                        title={trip.title}
                        start={trip.startDate}
                        end={trip.endDate}
                      />
                    ))
                  : null}
              </TripsList>
            );
          }}
        </Query>
      </Center>
    );
  }
}

export default Trips;
