import {useState, useEffect} from "react";
import {MY_TRIPS_QUERY} from "../../resolvers/Queries";
import {Radio} from "antd";
import {Trip} from "../interfaces";

interface Props {
  client: {
    query: Function;
  };
  setTrips: Function;
  setStatus: Function;
  setLoadingTrips: Function;
  trips: any;
  filterTypes: any;
}

const TripFilter: React.SFC<Props> = ({
  client,
  setTrips,
  setStatus,
  filterTypes,
  setLoadingTrips,
}) => {
  const {ALL, ACTIVE, ARCHIVED} = filterTypes;
  const [visitedFilters, setVisitedFilters] = useState({
    [ACTIVE]: 0,
    [ARCHIVED]: 0,
  });
  const fetchTrips = async (options?: {
    archived: boolean;
  }): Promise<any> => {
    try {
      setLoadingTrips(true);
      const {data} = await client.query({
        query: MY_TRIPS_QUERY,
        variables: {
          ...options,
        },
      });
      return data;
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingTrips(false);
    }
  };
  const removeDuplicateTrips = (
    trips1: Trip[],
    trips2: Trip[],
  ): Trip[] => {
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
      try {
        setLoadingTrips(true);
        visitedFilters[ACTIVE] = 1;
        const data = await fetchTrips({archived: false});
        setTrips(data.myTrips);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingTrips(false);
      }
    };
    fetchInitialTrips();
  }, []);
  const handleStatusChange = (e: any) => {
    setStatus(e.target.value);
  };
  return (
    <Radio.Group
      value={status}
      onChange={handleStatusChange}
      style={{display: "flex", justifyContent: "center"}}
    >
      <Radio.Button
        value={ALL}
        onClick={async () => {
          const allFiltersVisited = Object.keys(visitedFilters).every(
            (filter: any) => {
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
              const non = removeDuplicateTrips(prevState, data.myTrips);
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
              const non = removeDuplicateTrips(prevState, data.myTrips);
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
