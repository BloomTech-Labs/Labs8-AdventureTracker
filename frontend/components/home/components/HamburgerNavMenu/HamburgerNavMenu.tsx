import {
  Nav,
  MenuList,
  ListItem,
  Button,
  NavLink,
  ExitBtn,
  HamDivider,
} from "./HamburgerStyles";
import Link from "next/link";

export interface HamburgerNavMenuProps {
  setMenuActive: Function;
}

const HamburgerNavMenu: React.SFC<HamburgerNavMenuProps> = ({
  setMenuActive,
}) => {
  return (
    <Nav>
      <ExitBtn
        onClick={() => {
          setMenuActive(false);
        }}
      >
        X
      </ExitBtn>
      <MenuList aria-label="menu">
        <ListItem role="menuitem" tabIndex={0}>
          <NavLink href="#plan-trip">
            <Button>Plan Trip</Button>
          </NavLink>
        </ListItem>
        <ListItem role="menuitem" tabIndex={0}>
          <NavLink href="#share">
            <Button>Share</Button>
          </NavLink>
        </ListItem>
        <ListItem role="menuitem" tabIndex={0}>
          <NavLink href="#contact">
            <Button>Contact</Button>
          </NavLink>
        </ListItem>
      </MenuList>
      <HamDivider>OR</HamDivider>
      <MenuList aria-label="menu">
        <ListItem role="menuitem" tabIndex={0}>
          <Link href={{pathname: "/auth", query: {start: "sign-up"}}}>
            <NavLink href="/auth">
              <Button>Sign Up</Button>
            </NavLink>
          </Link>
        </ListItem>
        <ListItem role="menuitem" tabIndex={0}>
          <Link href={{pathname: "/auth", query: {start: "login"}}}>
            <NavLink href="/auth">
              <Button>Login</Button>
            </NavLink>
          </Link>
        </ListItem>
      </MenuList>
    </Nav>
  );
};

export default HamburgerNavMenu;
