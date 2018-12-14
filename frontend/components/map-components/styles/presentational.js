import styled from 'styled-components';

const Label = styled.label``;

const ReachedCheckBox = styled.input`
  margin-bottom: 0.4em;
`;
const CheckboxGroup = styled.div`
  display: flex;
  margin: 0.2em 0;
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;
const DeleteBtn = styled.button`
  font-size: 1rem;
  padding: 0.5em 0.5em;
  border: 0;
  color: ${props => props.theme.black};
  background: #ff6262;
`;
const SaveBtn = styled.button`
  font-size: 1rem;
  padding: 0.5em 0.5em;
  font-size: 1.3rem;
  margin: 0.5rem;
  border: 0;
  background: ${props => props.theme.blue};
  color: ${props => props.theme.white};
`;
const MarkerNameLabel = styled.label`
  margin-bottom: 0.4em;
`;
const MarkerNameBox = styled.input`
  height: 3rem;
  width: 100%;
  margin-bottom: 0.6em;
`;
const MarkerNameGroup = styled.div``;
const InfoWrapper = styled.div`
  display: flex;
  flex-flow: column;
`;

const CheckedInGroup = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 1em;
`;
const CheckedIn = styled.label`
  font-size: 1.4rem;
  margin-bottom: 0.4em;
`;

const CheckInBox = styled(ReachedCheckBox)`
  width: 60%;
`;
const ETAGroup = styled(CheckedInGroup)`
  & > * {
    margin-bottom: 0.5em;
  }
  margin-bottom: 1.5em;
`;
const ETA = styled(CheckedIn)``;

export {
  Label,
  ReachedCheckBox,
  ButtonGroup,
  DeleteBtn,
  SaveBtn,
  MarkerNameLabel,
  MarkerNameBox,
  MarkerNameGroup,
  InfoWrapper,
  CheckedInGroup,
  CheckedIn,
  CheckInBox,
  ETAGroup,
  ETA,
  CheckboxGroup
};
