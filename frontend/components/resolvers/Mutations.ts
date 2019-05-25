export {CREATE_TRIP_MUTATION, UPDATE_TRIP_MUTATION, ARCHIVE_TRIP_MUTATION};

import gql from "graphql-tag";

const CREATE_TRIP_MUTATION = gql`
  mutation CREATE_TRIP_MUTATION(
    $title: String!
    $startDate: DateTime
    $endDate: DateTime
    $archived: Boolean!
    $markers: [MarkerCreateManyWithoutTripInput!]!
    $image: String!
    $lat: Float!
    $lng: Float!
  ) {
    createTrip(
      title: $title
      startDate: $startDate
      endDate: $endDate
      archived: $archived
      markers: $markers
      image: $image
      lat: $lat
      lng: $lng
    ) {
      id
    }
  }
`;
const UPDATE_TRIP_MUTATION = gql`
  mutation UPDATE_TRIP_MUTATION($id: ID!, $data: TripUpdateInput!) {
    updateTrip(id: $id, data: $data) {
      id
    }
  }
`;

const ARCHIVE_TRIP_MUTATION = gql`
  mutation ARCHIVE_TRIP_MUTATION($tripId: ID!, $data: TripUpdateInput!) {
    updateTrip(id: $tripId, data: $data) {
      id
      archived
    }
  }
`;
