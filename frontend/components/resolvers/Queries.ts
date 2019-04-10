export {CURRENT_USER_QUERY, MY_TRIPS_QUERY, MY_TRIP_BY_ID};

import gql from "graphql-tag";

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
    }
  }
`;

const MY_TRIPS_QUERY = gql`
  query myTrips($archived: Boolean) {
    myTrips(archived: $archived) {
      id
      title
      description
      archived
      image
    }
  }
`;

const MY_TRIP_BY_ID = gql`
  query tripById($id: String!) {
    tripById(id: $id) {
      id
      title
      description
      archived
      markers {
        lat
        lng
        hasReached
        label
      }
    }
  }
`;
