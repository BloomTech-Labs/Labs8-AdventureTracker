export { CURRENT_MARKER_QUERY, MARKER_FOR_POSITION_QUERY };

import gql from 'graphql-tag';

const CURRENT_MARKER_QUERY = gql`
  query CURRENT_MARKER_QUERY($id: ID!) {
    marker(where: { id: $id }) {
      id
      status
      etaTime
      checkedInTime
      checkpointName
    }
  }
`;
const MARKER_FOR_POSITION_QUERY = gql`
  query CURRENT_MARKER_QUERY($id: ID!) {
    marker(where: { id: $id }) {
      position {
        id
      }
    }
  }
`;
