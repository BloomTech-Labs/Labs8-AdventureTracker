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
  border-top: 2px solid white;
  margin: 24px 0;
  position: relative;
  /* background: pink; */
  padding: 1rem;
  &:before {
    content: "OR";
    display: flex;
    justify-content: center;
    position: absolute;
    top: -100%;
    /* background: red; */
    width: 100%;
  }
  /* &:before {
    content: "OR";
    position: absolute;
    top: -20px;
    left: 50%;
    background: #303030dc;
    padding: 0 0.1em;
    transform: translateX(-50%);
  } */
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
