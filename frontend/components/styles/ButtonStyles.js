import styled from 'styled-components';

const PrimaryBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.5em 1em;
  border: none;
  border-radius: 10px;
  color: ${props => props.theme.white};
  background: ${props => props.theme.orange};
  cursor: pointer;
  font-size: 3rem;
`;

const FacebookBtn = styled(PrimaryBtn)`
  width: 100%;
  background-color: ${props => props.theme.blue};
`;

const SideNavText = styled.h2`
  margin-left: 0.6em;
`;

export { PrimaryBtn, FacebookBtn };
