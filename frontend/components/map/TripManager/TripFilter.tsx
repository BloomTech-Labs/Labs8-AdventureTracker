import {Radio} from "antd";
import {useState} from "react";
import {ALL_MY_TRIPS_QUERY} from "../../resolvers/Queries";

interface Props {
  client: {
    query: Function;
  };
  setTrips: Function;
}

const TripFilter: React.SFC<Props> = ({client, setTrips}) => {
  const [status, setStatus] = useState("active");
  const handleStatusChange = e => {
    setStatus(e.target.value);
  };
  return (
    <Radio.Group value={status} onChange={handleStatusChange}>
      <Radio.Button
        value="all"
        onClick={async () => {
          const {data} = await client.query({
            query: ALL_MY_TRIPS_QUERY,
          });
          console.log(data);
          setTrips(data.me.trip);
        }}
      >
        All
      </Radio.Button>
      <Radio.Button value="active">Active</Radio.Button>
      <Radio.Button value="archived">Archived</Radio.Button>
    </Radio.Group>
  );
};

export default TripFilter;
