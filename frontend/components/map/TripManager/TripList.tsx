import styled from "styled-components";

export interface Props {}

const TripList: React.SFC<Props> = ({children}) => {
  return <TripListWrapper>{children}</TripListWrapper>;
};
const TripListWrapper = styled.div`
  display: flex;
  & > * {
    margin: 24px;
  }
  max-height: 600px;
  max-width: 100%;
  overflow-y: auto;
  overflow-x: scroll;
`;
export default TripList;
