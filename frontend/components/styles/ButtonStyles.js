import styled from 'styled-components';

const PrimaryBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => (props.height ? props.height : '6rem')};
  width: ${props => (props.width ? props.width : '18rem')};
  border: none;
  border-radius: 10px;
  color: ${props => props.theme.white};
  background: ${props => props.theme.orange};
  cursor: pointer;
  font-size: 3rem;
`;

const FacebookBtn = styled(PrimaryBtn)`
  width: 100%;
  background: ${props => props.theme.blue};
`;
const SideNavBtn = styled.button`
  width: 100%;
  height: 5rem;
  color: ${props => props.theme.white};
  background: ${props => (props.active ? props.theme.orange : props.theme.white)};
`;
export { PrimaryBtn, FacebookBtn, SideNavBtn };
