import {Button, message} from "antd";
import {LOGOUT_MUTATION} from "../../resolvers/Mutations";
import Router from "next/router";
import styled from "styled-components";
import {useState} from "react";
export interface LogoutBtnProps {
  client: any;
}

const LogoutBtn: React.SFC<LogoutBtnProps> = ({client}) => {
  const [loggingOut, setLoggingOut] = useState(false);
  return (
    <LogoutButton
      loading={loggingOut}
      onClick={async () => {
        try {
          setLoggingOut(true);
          await client.mutate({
            mutation: LOGOUT_MUTATION,
          });
          message.success("You are now logged out!");
          Router.push({
            pathname: "/auth",
          });
        } catch (err) {
          message.error("Was not able to logout, try again.");
        } finally {
          setLoggingOut(false);
        }
      }}
    >
      Logout
    </LogoutButton>
  );
};
const LogoutButton = styled(Button)`
  position: absolute;
  bottom: 5%;
  right: 3%;
`;

export default LogoutBtn;
