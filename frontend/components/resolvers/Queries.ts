export {CURRENT_USER_QUERY, ALL_MY_TRIPS_QUERY};

import gql from "graphql-tag";

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
    }
  }
`;

const ALL_MY_TRIPS_QUERY = gql`
  query {
    me {
      trip {
        id
        title
        description
        archived
      }
    }
  }
`;
