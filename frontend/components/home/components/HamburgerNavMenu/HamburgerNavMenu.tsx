import {
  Nav,
  MenuList,
  ListItem,
  Button,
  NavLink,
  AuthLink,
  ExitBtn,
  HamDivider,
} from "./HamburgerStyles";

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
      <HamDivider />
      <MenuList aria-label="menu">
        <ListItem role="menuitem" tabIndex={0}>
          <NavLink href="/auth">
            <Button>Sign Up</Button>
          </NavLink>
        </ListItem>
        <ListItem role="menuitem" tabIndex={0}>
          <NavLink href="/auth">
            <Button>Login</Button>
          </NavLink>
        </ListItem>
      </MenuList>
    </Nav>
  );
};

export default HamburgerNavMenu;
