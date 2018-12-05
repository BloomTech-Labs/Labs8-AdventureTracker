// Home -> Trips
// Home -> Trips -> Create a Trip
// Home -> Trips -> Mountain Adventure
// Home -> Settings
// Home -> Billing
import Link from 'next/link';
import { Fragment } from 'react';
import styled from 'styled-components';

const BreadcrumbsWrapper = styled.nav`
  display: flex;
  color: ${props => props.theme.white};
  & > *::after {
    content: '/';
    margin-left: 0.5rem;
  }
`;
const Breadcrumbs = props => {
  const { route } = props.router;
  //   console.log(route);
  const TRIPLIST = '/triplist';
  const BILLING = '/billing';
  const SETTINGS = '/settings';
  return (
    <BreadcrumbsWrapper>
      <Link href={props.startCrumb}>Home</Link>
      {(() => {
        if (route.match(TRIPLIST)) {
          return <Link href={TRIPLIST}>Trips</Link>;
        }
        if (route.match(BILLING)) {
          return <Link href={BILLING}>Billing</Link>;
        }
        if (route.match(SETTINGS)) {
          return <Link href={SETTINGS}>Settings</Link>;
        }
      })()}
      {(() => {
        if (props.endCrumbLink && props.endCrumbName) {
          return <Link href={props.endCrumbLink}>{props.endCrumbName}</Link>;
        }
      })()}
    </BreadcrumbsWrapper>
  );
};

export default Breadcrumbs;
