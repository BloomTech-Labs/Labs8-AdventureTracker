import styled from 'styled-components';
const PrimaryLinkBtn = styled.a`
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

export default PrimaryLinkBtn;
