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
  const ALL = "all";
  const ACTIVE = "active";
  const ARCHIVED = "archived";
  const [status, setStatus] = useState(ACTIVE);

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
  useEffect(() => {
    const fetchInitialTrips = async () => {
      const data = await fetchTrips({archived: false});
      setTrips(data.myTrips);
    };
    fetchInitialTrips();
  }, []);
  const handleStatusChange = (e: any) => {
    setStatus(e.target.value);
  };
  return (
    <Radio.Group value={status} onChange={handleStatusChange}>
      <Radio.Button
        value={ALL}
        onClick={async () => {
          const data = await fetchTrips();
          setTrips(data.myTrips);
        }}
      >
        All
      </Radio.Button>
      <Radio.Button
        value={ACTIVE}
        onClick={async () => {
          const data = await fetchTrips({archived: false});
          setTrips(data.myTrips);
        }}
      >
        Active
      </Radio.Button>
      <Radio.Button
        value={ARCHIVED}
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
