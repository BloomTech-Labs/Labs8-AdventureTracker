import MapComponent from "../components/map/MapComponent";
import {ApolloConsumer} from "react-apollo";
import {withRouter} from "next/router";

const Map = props => {
  const {query, asPath} = props.router;
  // console.log({router: props.router});
  let productionQueryId = "";
  if (
    !query.id &&
    asPath.match(/\/map\/\?id=(\w+)/) &&
    process.env.NODE_ENV === "production"
  ) {
    productionQueryId = asPath.match(/\/map\/\?id=(\w+)/)[1];
    console.log("productionQueryId", productionQueryId);
  }
  return (
    <ApolloConsumer>
      {client => (
        <MapComponent
          client={client}
          tripId={
            query.id
              ? query.id
              : process.env.NODE_ENV === "production"
              ? productionQueryId
              : ""
          }
        />
      )}
    </ApolloConsumer>
  );
};

export default withRouter(Map);
