import {useState, useEffect} from "react";
import {MY_TRIPS_QUERY} from "../../resolvers/Queries";
import {Radio} from "antd";

interface Props {
  client: {
    query: Function;
  };
  setTrips: Function;
  setStatus: Function;
  trips: any;
  filterTypes: any;
}

const TripFilter: React.SFC<Props> = ({
  client,
  setTrips,
  setStatus,
  filterTypes,
}) => {
  const {ALL, ACTIVE, ARCHIVED} = filterTypes;
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
  //@ts-ignore
  const removeDuplicates = (trips1, trips2) => {
    return trips1
      .filter(trip1 => {
        return trips2.every(trip2 => {
          return trip1.id !== trip2.id;
        });
      })
      .concat(trips2);
  };
  useEffect(() => {
    const fetchInitialTrips = async () => {
      visitedFilters[ACTIVE] = 1;
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
          const allFiltersVisited = Object.keys(visitedFilters).every(
            filter => {
              //@ts-ignore
              return visitedFilters[filter] === 1;
            },
          );
          if (!allFiltersVisited) {
            setVisitedFilters({
              [ACTIVE]: 1,
              [ARCHIVED]: 1,
            });
            const data = await fetchTrips();
            setTrips(data.myTrips);
          }
        }}
      >
        All
      </Radio.Button>
      <Radio.Button
        value={ACTIVE}
        onClick={async () => {
          if (visitedFilters[ACTIVE] !== 1) {
            setVisitedFilters((prevState: any) => {
              return {
                ...prevState,
                [ACTIVE]: 1,
              };
            });
            const data = await fetchTrips({archived: false});
            setTrips((prevState: any) => {
              const non = removeDuplicates(prevState, data.myTrips);
              console.log(non);
              return non;
            });
          }
        }}
      >
        Active
      </Radio.Button>
      <Radio.Button
        value={ARCHIVED}
        onClick={async () => {
          if (visitedFilters[ARCHIVED] !== 1) {
            setVisitedFilters((prevState: any) => {
              return {
                ...prevState,
                [ARCHIVED]: 1,
              };
            });
            const data = await fetchTrips({archived: true});

            setTrips((prevState: any) => {
              const non = removeDuplicates(prevState, data.myTrips);
              console.log(non);
              return non;
            });
          }
        }}
      >
        Archived
      </Radio.Button>
    </Radio.Group>
  );
};

export default TripFilter;
