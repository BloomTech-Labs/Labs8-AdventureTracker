import styled from 'styled-components';

const DateBadge = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  background: ${props =>
    props.background === 'green' ? props.theme.lightgreen : props.theme.lightred};
  border-radius: 4px;
  height: 3rem;
  padding: 0 1em;
  max-width: 12rem;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  font-size: 1.3rem;
`;

export default DateBadge;
