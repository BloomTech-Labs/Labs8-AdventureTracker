import {useState, useEffect} from "react";
import {MY_TRIPS_QUERY} from "../../resolvers/Queries";
import {Radio} from "antd";

interface Props {
  client: {
    query: Function;
  };
  setTrips: Function;
  filteredTrips: any;
  trips: any;
  setFilteredTrips: Function;
}

const TripFilter: React.SFC<Props> = ({
  client,
  setTrips,
  filteredTrips,
  trips,
  setFilteredTrips,
}) => {
  const ALL = "all";
  const ACTIVE = "active";
  const ARCHIVED = "archived";
  const [status, setStatus] = useState(ACTIVE);
  const [visitedFilters, setVisitedFilters] = useState({
    [ACTIVE]: 0,
    [ARCHIVED]: 0,
  });
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
      visitedFilters[ACTIVE] = 1;
      const data = await fetchTrips({archived: false});
      setTrips(data.myTrips);
      setFilteredTrips(data.myTrips);
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
          const allFiltersVisited = Object.keys(visitedFilters).every(
            filter => {
              //@ts-ignore
              console.log(visitedFilters[filter]);
              return visitedFilters[filter] === 1;
            },
          );
          if (allFiltersVisited) {
            setFilteredTrips(trips);
          } else {
            setVisitedFilters({
              [ACTIVE]: 1,
              [ARCHIVED]: 1,
            });
            const data = await fetchTrips();
            setTrips(data.myTrips);
            setFilteredTrips(data.myTrips);
          }
        }}
      >
        All
      </Radio.Button>
      <Radio.Button
        value={ACTIVE}
        onClick={async () => {
          if (visitedFilters[ACTIVE] === 1) {
            setFilteredTrips(
              trips.filter((trip: any) => {
                return trip.archived === false;
              }),
            );
          } else {
            setVisitedFilters((prevState: any) => {
              return {
                ...prevState,
                [ACTIVE]: 1,
              };
            });
            const data = await fetchTrips({archived: false});
            setTrips((prevState: any) => [...prevState, ...data.myTrips]);
            setFilteredTrips(data.myTrips);
          }
        }}
      >
        Active
      </Radio.Button>
      <Radio.Button
        value={ARCHIVED}
        onClick={async () => {
          if (visitedFilters[ARCHIVED] === 1) {
            setFilteredTrips(
              trips.filter((trip: any) => {
                return trip.archived === true;
              }),
            );
          } else {
            setVisitedFilters((prevState: any) => {
              return {
                ...prevState,
                [ARCHIVED]: 1,
              };
            });
            const data = await fetchTrips({archived: true});
            setTrips((prevState: any) => [...prevState, ...data.myTrips]);
            setFilteredTrips(data.myTrips);
          }
        }}
      >
        Archived
      </Radio.Button>
    </Radio.Group>
  );
};

export default TripFilter;
