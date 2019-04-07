import {Query} from "react-apollo";
import {CURRENT_USER_QUERY} from "./resolvers/Queries";
const User = (props: any) => {
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>;
};

export default User;
