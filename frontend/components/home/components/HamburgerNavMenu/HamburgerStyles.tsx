import styled from "styled-components";
//@ts-ignore
import vars from "lib/styles/variables";
const Nav = styled.nav`
  display: none;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 101;
  min-height: 100%;
  background: #303030dc;
  overflow-y: scroll;
  @media screen and (max-width: 890px) {
    display: flex;
  }
`;
const ExitBtn = styled.button`
  color: white;
  align-self: flex-end;
  font-size: 4rem;
  padding: ${vars.space_sm};
  margin: ${vars.space_md};
  background: none;
  &:hover {
    background: #dddddd;
    color: #1d1d1d;
  }
`;
const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  padding: ${vars.space_sm};
  padding-bottom: 0;
  width: 100%;
`;

const ListItem = styled.li`
  width: 100%;
  margin-bottom: 18px;
  &:hover {
    background: #dddddd;
  }
  &:last-child {
    margin-bottom: 0px;
  }
`;

const Button = styled.button`
  font-size: 4rem;
  color: white;
  background: none;
  padding: 0.4em 0;
  width: 100%;
  &:hover {
    color: #1d1d1d;
  }
`;
const HamDivider = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px 0;
  position: relative;
  padding: 1rem;
  &::before {
    content: "";
    border-top: 2px solid white;
    width: 40%;
    position: absolute;
    top: 50%;
    right: 0;
  }
  &::after {
    content: "";
    border-top: 2px solid white;
    width: 40%;
    position: absolute;
    top: 50%;
    left: 0;
  }
`;
const NavLink = styled.a``;

const AuthLink = styled.a``;

export {
  Nav,
  MenuList,
  ListItem,
  HamDivider,
  Button,
  NavLink,
  AuthLink,
  ExitBtn,
};
