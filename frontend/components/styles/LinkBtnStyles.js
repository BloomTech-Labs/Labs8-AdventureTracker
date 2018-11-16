import styled from 'styled-components';
import { PrimaryLinkBtn } from './PrimaryLinkBtn';

const FacebookBtn = styled(PrimaryLinkBtn)`
  width: 100%;
  background: ${props => props.theme.blue};
`;

export { FacebookBtn };
