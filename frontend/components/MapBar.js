import styled from 'styled-components';
const ProgressWrapper = styled.div`
  height: 3rem;
  width: 40%;
  background: ${props => props.theme.white};
`;
const ProgressBar = styled.div`
  height: 100%;
  width: ${props => props.width};
  background: green;
`;
const MapBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  width: 100%;
  height: 10rem;
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
const CalendarInput = styled.input`
  height: 2em;
  width: 13rem;
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
const MapBar = props => {
  return (
    <MapBarWrapper>
      <AdventureTitle>{props.title ? props.title : 'Placeholder Text'}</AdventureTitle>
      <ProgressWrapper>
        <ProgressBar width={'20%'} />
      </ProgressWrapper>
      <CalendarWrapper>
        <CalendarGroup>
          <CalendarLabel htmlFor="start">Start Time:</CalendarLabel>
          {/* example: <input id="date" type="date" value="2017-06-01"> */}
          <CalendarInput id="start" type="date" />
        </CalendarGroup>
        <CalendarGroup>
          <CalendarLabel htmlFor="end">End Time:</CalendarLabel>
          <CalendarInput id="end" type="date" />
        </CalendarGroup>
      </CalendarWrapper>
      <MapBtn>Edit Trip</MapBtn>
    </MapBarWrapper>
  );
};

export default MapBar;
