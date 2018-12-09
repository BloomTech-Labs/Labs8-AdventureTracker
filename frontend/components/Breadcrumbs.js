// Home -> Trips
// Home -> Trips -> Create a Trip
// Home -> Trips -> Mountain Adventure
// Home -> Settings
// Home -> Billing
import Link from 'next/link';
import { Fragment } from 'react';
import styled from 'styled-components';
import { HomeIcon, GlobeIcon, SettingsIcon, BillingIcon } from './styles/SVGs';

const BreadcrumbsWrapper = styled.nav`
  display: flex;
  justify-content: space-evenly;
  color: ${props => props.theme.white};

  /* background: black; */
`;
const Breadcrumb = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 0 5rem 0 0;
  height: 100%;
  &:last-child .circle-crumb {
    background: ${props => props.theme.lightorange};
    &::after {
      content: '';
      border: none;
    }
  }
`;
const CircleWrapper = styled.div.attrs({
  className: 'circle-crumb'
})`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: ${props => props.length};
  width: ${props => props.length};
  background: ${props => props.theme.orange};
  color: ${props => props.theme.white};
  position: relative;
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    border-top: 6px solid ${props => props.theme.orange};
    width: 5.5rem;
    left: 100%;
  }
`;
const BreadText = styled.div`
  display: flex;
  color: white;
  margin: 0;
  position: absolute;
  bottom: -65%;
`;
const Breadcrumbs = props => {
  const { route } = props.router;
  //   console.log(route);
  const TRIPLIST = '/triplist';
  const BILLING = '/billing';
  const SETTINGS = '/settings';
  const ARCHIVES = '/archivelist';
  const ICON_LENGTH = '70%';
  const CIRCLE_DIAMETER = '5rem';
  return (
    <BreadcrumbsWrapper>
      <Link href={props.startCrumb}>
        <Breadcrumb>
          <CircleWrapper length={CIRCLE_DIAMETER}>
            <HomeIcon length={ICON_LENGTH} />
            <BreadText>Home</BreadText>
          </CircleWrapper>
        </Breadcrumb>
      </Link>
      {(() => {
        if (route.match(TRIPLIST)) {
          return (
            <Link href={TRIPLIST}>
              <Breadcrumb>
                <CircleWrapper length={CIRCLE_DIAMETER}>
                  <GlobeIcon length={ICON_LENGTH} />
                  <BreadText>Trips</BreadText>
                </CircleWrapper>
              </Breadcrumb>
            </Link>
          );
        }
        if (route.match(ARCHIVES)) {
          return (
            <Link href={ARCHIVES}>
              <Breadcrumb>
                <CircleWrapper length={CIRCLE_DIAMETER}>
                  <GlobeIcon length={ICON_LENGTH} />
                  <BreadText>Archives</BreadText>
                </CircleWrapper>
              </Breadcrumb>
            </Link>
          );
        }
        if (route.match(BILLING)) {
          return (
            <Link href={BILLING}>
              <Breadcrumb>
                <CircleWrapper length={CIRCLE_DIAMETER}>
                  <BillingIcon length={ICON_LENGTH} />
                  <BreadText>Billing</BreadText>
                </CircleWrapper>
              </Breadcrumb>
            </Link>
          );
        }
        if (route.match(SETTINGS)) {
          return (
            <Link href={SETTINGS}>
              <Breadcrumb>
                <CircleWrapper length={CIRCLE_DIAMETER}>
                  <SettingsIcon length={ICON_LENGTH} />
                  <BreadText>Settings</BreadText>
                </CircleWrapper>
              </Breadcrumb>
            </Link>
          );
        }
      })()}
      {(() => {
        if (props.endCrumbLink && props.endCrumbName) {
          return (
            <Link href={props.endCrumbLink}>
              <Breadcrumb>
                <CircleWrapper length={CIRCLE_DIAMETER}>
                  <GlobeIcon length={ICON_LENGTH} />
                </CircleWrapper>
                <BreadText>{props.endCrumbName}</BreadText>
              </Breadcrumb>
            </Link>
          );
        }
      })()}
    </BreadcrumbsWrapper>
  );
};

export default Breadcrumbs;
