export {
  CREATE_MARKER_MUTATION,
  UPDATE_MARKER_MUTATION,
  UPDATE_POSITION_MUTATION,
  UPDATE_CHECKIN_MUTATION,
  POSITION_TO_UPDATE_MUTATION,
  DELETE_MARKER_MUTATION
};
import gql from 'graphql-tag';

const CREATE_MARKER_MUTATION = gql`
  mutation CREATE_MARKER_MUTATION(
    $tripId: ID!
    $status: Progress!
    $etaTime: DateTime!
    $checkedInTime: DateTime!
    $checkpointName: String!
    $position: PositionCreateWithoutMarkerInput!
  ) {
    createMarkerMutation(
      tripId: $tripId
      status: $status
      etaTime: $etaTime
      checkedInTime: $checkedInTime
      checkpointName: $checkpointName
      position: $position
    ) {
      id
      status
      etaTime
      checkedInTime
      checkpointName
    }
  }
`;
const UPDATE_MARKER_MUTATION = gql`
  mutation UPDATE_MARKER_MUTATION(
    $markerId: ID!
    $status: Progress!
    $etaTime: DateTime!
    $checkpointName: String!
  ) {
    updateMarker(
      markerId: $markerId
      status: $status
      etaTime: $etaTime
      checkpointName: $checkpointName
    ) {
      id
      status
      etaTime
      checkpointName
    }
  }
`;
const UPDATE_POSITION_MUTATION = gql`
  mutation UPDATE_POSITION_MUTATION($markerId: ID!, $position: Position!) {
    updateMarkerPosition(markerId: $markerId, position: $position) {
      id
      position {
        lat
        lng
      }
    }
  }
`;
const UPDATE_CHECKIN_MUTATION = gql`
  mutation UPDATE_CHECKIN_MUTATION($markerId: ID!, $status: Progress!, $checkedInTime: DateTime!) {
    updateMarkerStatus(markerId: $markerId, status: $status, checkedInTime: $checkedInTime) {
      id
      status
    }
  }
`;

const POSITION_TO_UPDATE_MUTATION = gql`
  mutation POSITION_TO_UPDATE_MUTATION($id: ID!, $lat: Float!, $lng: Float!) {
    updatePosition(where: { id: $id }, data: { lat: $lat, lng: $lng }) {
      id
    }
  }
`;
const DELETE_MARKER_MUTATION = gql`
  mutation DELETE_MARKER_MUTATION($id: ID!) {
    deleteMarker(where: { id: $id }) {
      id
    }
  }
`;
