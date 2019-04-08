import {useState, useEffect} from "react";
import {MY_TRIPS_QUERY} from "../../resolvers/Queries";
import {Radio} from "antd";

interface Props {
  client: {
    query: Function;
  };
  setTrips: Function;
}

const TripFilter: React.SFC<Props> = ({client, setTrips}) => {
  const [status, setStatus] = useState("active");

  const fetchTrips = async (options?: {
    archived: boolean;
  }): Promise<any> => {
    const {data} = await client.query({
      query: MY_TRIPS_QUERY,
      variables: {
        ...options,
      },
    });
    return data;
  };

  const handleStatusChange = (e: any) => {
    setStatus(e.target.value);
  };
  return (
    <Radio.Group value={status} onChange={handleStatusChange}>
      <Radio.Button
        value="all"
        onClick={async () => {
          const data = await fetchTrips();
          setTrips(data.myTrips);
        }}
      >
        All
      </Radio.Button>
      <Radio.Button
        value="active"
        onClick={async () => {
          const data = await fetchTrips({archived: false});
          setTrips(data.myTrips);
        }}
      >
        Active
      </Radio.Button>
      <Radio.Button
        value="archived"
        onClick={async () => {
          const data = await fetchTrips({archived: true});
          setTrips(data.myTrips);
        }}
      >
        Archived
      </Radio.Button>
    </Radio.Group>
  );
};

export default TripFilter;
