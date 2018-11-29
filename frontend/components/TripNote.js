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
  border-top-left-radius: 8px;
  cursor: pointer;
`;
const TripNote = ({ title }) => {
  return (
    <NoteWrapper length={'30rem'}>
      <AdventureTitle>Mountain Adventure</AdventureTitle>
      <MapImage src="http://placekitten.com/400/300" />
      <BadgeGroup>
        <BadgeText>Start:</BadgeText>
        <DateBadge background={'green'}>3-12-2018</DateBadge>
      </BadgeGroup>
      <BadgeGroup>
        <BadgeText>End:</BadgeText>
        <DateBadge>4-08-2018</DateBadge>
      </BadgeGroup>
      <ArchiveBtn>Archive?</ArchiveBtn>
    </NoteWrapper>
  );
};

export default TripNote;
