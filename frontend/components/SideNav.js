import Link from 'next/link';
import { Component } from 'react';
import styled from 'styled-components';
import { SideNavBtn } from './styles/ButtonStyles';

const SidebarWrapper = styled.aside`
  display: flex;
  flex-flow: column;
  width: 20rem;
  height: 50rem;
  & > * {
    margin-bottom: 1.3rem;
  }
  position: fixed;
`;

class SideNav extends Component {
  render() {
    return (
      <SidebarWrapper>
        {/* keys - are the button names and values will be the link to the page */}
        {/* example: links = { trip: "/triplist"} This creates a button with the text "Trip" and it goes to /triplist when clicked*/}
        {/* setting the active prop to true will change the color from blue to orange */}
        {Object.keys(this.props.links).map(link => {
          if (link !== this.props.active) {
            return (
              <Link key={link} href={`${this.props.links[link]}`}>
                <SideNavBtn>{link[0].toUpperCase() + link.slice(1)}</SideNavBtn>
              </Link>
            );
          } else {
            return (
              <Link key={link} href={`${this.props.links[link]}`}>
                <SideNavBtn active={true}>{link[0].toUpperCase() + link.slice(1)}</SideNavBtn>
              </Link>
            );
          }
        })}
      </SidebarWrapper>
    );
  }
}

export default SideNav;
