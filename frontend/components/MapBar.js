import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation, Query } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import DatePicker from 'react-datepicker';
import { FormArea } from './styles/FormStyles';
import { CURRENT_USER_QUERY } from './User';
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
const TitleBox = styled(FormArea)``;
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

const CREATE_TRIP_MUTATION = gql`
  mutation CREATE_TRIP_MUTATION(
    $title: String!
    $startDate: String!
    $endDate: String!
    $user: UserWhereUniqueInput!
    $archived: Boolean!
    $markers: [MarkerCreateInput!]!
  ) {
    createTrip(
      title: $title
      user: $user
      startDate: $startDate
      endDate: $endDate
      archived: $archived
      markers: $markers
    ) {
      id
    }
  }
`;

class MapBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripTitle: 'My Trip'
    };
  }

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const progressFormula = (this.props.completedChecks / this.props.markerAmount) * 100;
    return (
      <MapBarWrapper>
        <AdventureTitle>
          {this.props.title ? (
            this.props.title
          ) : (
            <TitleBox
              type="text"
              name="tripTitle"
              placeholder="Trip Title"
              id="tripTitle"
              value={this.state.tripTitle}
              onChange={e => {
                this.saveToState(e);
              }}
            />
          )}
        </AdventureTitle>
        <ProgressWrapper>
          <ProgressBar width={this.props.completedChecks === 0 ? '0%' : `${progressFormula}%`}>
            <ProgressStats>
              {this.props.completedChecks} of {this.props.markerAmount} Completed
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
              onSelect={this.props.setStartDate}
              selected={this.props.startDate}
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
              onSelect={this.props.setEndDate}
              onKeyDown={e => {
                e.preventDefault();
              }}
              selected={this.props.endDate}
            />
          </CalendarGroup>
        </CalendarWrapper>
        <Mutation
          mutation={CREATE_TRIP_MUTATION}
          refetchQueries={[{ query: CURRENT_USER_QUERY }]}
          variables={{
            title: this.state.tripTitle,
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            archived: false,
            markers: this.props.markers,
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
      </MapBarWrapper>
    );
  }
}

export { MapBar, CalendarGroup, CalendarInput, CalendarLabel, CalendarWrapper };
