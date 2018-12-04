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
const SideNavText = styled.h2`
  margin-left: 0.6em;
`;
const SideNavBtnWrapper = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0em 0.7em;
  font-size: 1em;
  font-weight: 400;
  color: ${props => props.theme.white};
  background: ${props => (props.active ? props.theme.orange : props.theme.blue)};
  border: none;
  cursor: pointer;
`;

const SideNavBtn = props => (
  <SideNavBtnWrapper active={props.active}>
    {props.svgIcon}
    <SideNavText>{props.text}</SideNavText>
  </SideNavBtnWrapper>
);
export { PrimaryBtn, FacebookBtn, SideNavBtn };
