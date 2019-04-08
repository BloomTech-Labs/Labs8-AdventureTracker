export {CURRENT_USER_QUERY, MY_TRIPS_QUERY};

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
    }
  }
`;
