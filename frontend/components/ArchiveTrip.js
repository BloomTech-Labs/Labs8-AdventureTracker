import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import styled from 'styled-components';
import DateBadge from './styles/DateBadge';

const NoteWrapper = styled.div`
  position: relative;
  height: ${props => props.length};
  width: ${props => props.length};
  border: 4px solid ${props => props.theme.darkgrey};
  padding: 1rem 3rem;
`;
const AdventureTitle = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0.5rem 0;
  font-weight: 400;
  font-size: 2rem;
  overflow: hidden;
`;
const MapImage = styled.img`
  width: 100%;
  height: 14rem;
`;
const BadgeGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 14rem;
`;
const BadgeText = styled.span`
  font-weight: 400;
`;
const ArchiveBtn = styled.button`
  display: flex;
  flex-flow: column;
  position: absolute;
  justify-content: space-around;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.lightorange};
  height: 8rem;
  width: 6rem;
  border: none;
  margin: .5rem;
  border-radius: 10px;
  cursor: pointer;
`;

const UPDATE_TRIP_MUTATION = gql`
  mutation UPDATE_TRIP_MUTATION($id: ID!, $archived: Boolean!) {
    archiveTrip(id: $id, archived: $archived) {
      id
      archived
    }
  }
`;

const ArchiveTrip = ({ id, title, start, end, archived }) => {
  return (
    <NoteWrapper length={'30rem'}>
      <AdventureTitle>{title}</AdventureTitle>
      <MapImage src="../static/hiking-girl.jpg" />
      <BadgeGroup>
        <BadgeText>Start:</BadgeText>
        <DateBadge background={'green'}>{start}</DateBadge>
      </BadgeGroup>
      <BadgeGroup>
        <BadgeText>End:</BadgeText>
        <DateBadge>{end}</DateBadge>
      </BadgeGroup>
      <Mutation
        mutation={UPDATE_TRIP_MUTATION}
        variables={{
          id,
          archived: false
        }}
      >
        {(archiveTrip, { error, loading }) => {
          return (
            <ArchiveBtn
              onClick={async () => {
                archiveTrip();
                Router.push({ pathname: '/archivelist' });
              }}
            >
              Unarchive
            </ArchiveBtn>
          );
        }}
      </Mutation>
    </NoteWrapper>
  );
};

export default ArchiveTrip;
