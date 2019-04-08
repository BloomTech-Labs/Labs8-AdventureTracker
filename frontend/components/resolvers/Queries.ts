export {CURRENT_USER_QUERY};

import gql from "graphql-tag";

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
    }
  }
`;
