import styled from 'styled-components';
import { Mutation, Query } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import DatePicker from 'react-datepicker';
import { CURRENT_USER_QUERY } from './User';
import { withRouter } from 'next/router';
import { Fragment } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
const ProgressWrapper = styled.div`
  display: flex;
  position: relative;
  height: 3rem;
  width: 30%;
  background: ${props => props.theme.white};
`;
const ProgressBar = styled.div`
  display: flex;
  height: 100%;
  width: ${props => props.width};
  background: green;
`;
const ProgressStats = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: ${props => props.theme.black};
  font-weight: bold;
`;
const MapBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  width: 100%;
  height: 9rem;
  background: ${props => props.theme.blue};
  color: ${props => props.theme.white};
`;

const AdventureTitle = styled.h2`
  margin-left: 1em;
  word-wrap: break-word;
`;
const CalendarGroup = styled.div`
  display: flex;
  align-items: center;
`;
const CalendarLabel = styled.label`
  padding: 0 1em 0 0;
`;
const CalendarInput = styled(DatePicker)`
  display: flex;
  justify-content: center;
  height: 2em;
  text-align: center;
  padding: 0 1rem;
  max-width: 10rem;
`;
const MapBtn = styled.button`
  background: ${props => props.theme.lightorange};
  color: ${props => props.theme.black};
  padding: 0.5em;
  font-size: 2rem;
  height: 100%;
  cursor: pointer;
  border: none;
`;
const CalendarWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-end;
`;
const TRIP_QUERY = gql`
  query getTrip($id: ID!) {
    trip(where: { id: $id }) {
      startDate
      endDate
      title
    }
  }
`;

const CREATE_TRIP_MUTATION = gql`
  mutation CREATE_TRIP_MUTATION(
    $title: String!
    $startDate: String!
    $endDate: String!
    $user: UserWhereUniqueInput!
    $description: String!
    $archived: Boolean! # $markers: [Marker!]!
  ) {
    createTrip(
      title: $title
      user: $user
      startDate: $startDate
      endDate: $endDate
      description: $description
      archived: $archived
    ) {
      id
    }
  }
`;

const MapBar = withRouter(props => {
  const progressFormula = (props.completedChecks / props.markerAmount) * 100;
  const tripId = props.router.query.id;
  return (
    <MapBarWrapper>
      <Query query={TRIP_QUERY} variables={{ id: tripId }}>
        {({ data, loading, error }) => {
          console.log(data);
          const { trip } = data;
          return (
            <Fragment>
              <AdventureTitle>{props.title ? props.title : 'Placeholder Title'}</AdventureTitle>
              <ProgressWrapper>
                <ProgressBar width={props.completedChecks === 0 ? '0%' : `${progressFormula}%`}>
                  <ProgressStats>
                    {props.completedChecks} of {props.markerAmount} Completed
                  </ProgressStats>
                </ProgressBar>
              </ProgressWrapper>
              <CalendarWrapper>
                <CalendarGroup>
                  <CalendarLabel htmlFor="start">Start Date:</CalendarLabel>
                  {/* example: <input id="date" type="date" value="2017-06-01"> */}
                  <CalendarInput
                    id="start"
                    type="date"
                    placeholderText="Start Date"
                    onSelect={props.setStartDate}
                    selected={props.startDate}
                    name="startDate"
                    onKeyDown={e => {
                      e.preventDefault();
                    }}
                  />
                </CalendarGroup>
                <CalendarGroup>
                  <CalendarLabel htmlFor="end">End Date:</CalendarLabel>
                  <CalendarInput
                    placeholderText="End Date"
                    name="endDate"
                    id="end"
                    onSelect={props.setEndDate}
                    onKeyDown={e => {
                      e.preventDefault();
                    }}
                    selected={props.endDate}
                  />
                </CalendarGroup>
              </CalendarWrapper>

              <Mutation
                mutation={CREATE_TRIP_MUTATION}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
                variables={{
                  title: props.title,
                  startDate: props.startDate,
                  endDate: props.endDate,
                  //TODO - add description
                  description: 'awesome trip!',
                  archived: false,
                  // markers: props.markers
                  user: { id: '', email: '', facebookID: '' }
                }}
              >
                {(createTrip, { error, loading }) => {
                  return (
                    <MapBtn
                      onClick={async () => {
                        await createTrip();
                        Router.push({ pathname: '/triplist' });
                      }}
                    >
                      Save
                      <br /> Trip
                    </MapBtn>
                  );
                }}
              </Mutation>
            </Fragment>
          );
        }}
      </Query>
    </MapBarWrapper>
  );
});

export { MapBar, CalendarGroup, CalendarInput, CalendarLabel, CalendarWrapper };
