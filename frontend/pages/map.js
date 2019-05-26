import MapComponent from "../components/map/MapComponent";
import {ApolloConsumer} from "react-apollo";
import {withRouter} from "next/router";

const Map = props => {
  const {query} = props.router;
  console.log({props});
  return (
    <ApolloConsumer>
      {client => <MapComponent client={client} tripId={query.id} />}
    </ApolloConsumer>
  );
};

export default withRouter(Map);
