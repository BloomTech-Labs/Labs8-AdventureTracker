import {Button, message} from "antd";
import {LOGOUT_MUTATION} from "../../resolvers/Mutations";
import Router from "next/router";

export interface LogoutBtnProps {
  client: any;
}

const LogoutBtn: React.SFC<LogoutBtnProps> = ({client}) => {
  return (
    <Button
      type="primary"
      onClick={async () => {
        try {
          await client.mutate({
            mutation: LOGOUT_MUTATION,
          });
          message.success("You are now logged out!");
          Router.push({
            pathname: "/auth",
          });
        } catch (err) {
          message.error("Was not able to logout, try again.");
        }
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutBtn;
