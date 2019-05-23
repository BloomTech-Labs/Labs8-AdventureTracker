import {Modal, Button, Spin} from "antd";
import TripCard from "./TripCard";
import TripFilter from "./TripFilter";
import {Trip} from "../interfaces";
import tripPlaceholderImg from "static/trip-placeholder.jpg";
import TripList from "./TripList";
import tripManagerReducer from "./reducer/tripManagerReducer";
import {useEffect} from "react";
import {MY_TRIPS_QUERY} from "../../resolvers/Queries";
import {Empty} from "antd";

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: Function;
  client: any;
}

const TripModal: React.SFC<Props> = ({
  isModalVisible,
  setIsModalVisible,
  client,
}) => {
  const ALL = "ALL";
  const ACTIVE = "ACTIVE";
  const ARCHIVED = "ARCHIVED";
  const [tripState, tripDispatch] = tripManagerReducer();
  const {trips, filter, isLoading} = tripState;
  useEffect(() => {
    const fetchMyTrips = async () => {
      try {
        tripDispatch({type: "FETCHING_TRIPS"});
        const {data}: any = await client.query({
          query: MY_TRIPS_QUERY,
          variables: {
            archived: false,
          },
        });
        // console.log(data);
        tripDispatch({type: "FETCHED_TRIPS", trips: data.myTrips});
      } catch (err) {
        tripDispatch({type: "ERROR_FETCHING_TRIPS"});
      }
    };
    fetchMyTrips();
  }, []);

  return (
    <Modal
      title="Trips"
      visible={isModalVisible}
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onCancel={() => setIsModalVisible(false)}
      footer={[
        <Button
          type="danger"
          key="back"
          onClick={() => setIsModalVisible(false)}
        >
          Exit
        </Button>,
      ]}
    >
      <TripFilter
        tripDispatch={tripDispatch}
        filterTypes={{ALL, ACTIVE, ARCHIVED}}
      />
      {isLoading ? <Spin tip="Loading Trips..." size="large" /> : null}

      {trips.length ? (
        trips
          .filter((trip: Trip) => {
            if (filter === ALL) {
              return trip;
            } else if (filter === ACTIVE) {
              return trip.archived === false;
            } else if (filter === ARCHIVED) {
              return trip.archived;
            }
          })
          .map((trip: Trip) => {
            const {id, title, description, archived, image} = trip;
            return (
              <TripCard
                key={id}
                id={id}
                title={title}
                description={description}
                archived={archived}
                imageCoverSrc={image}
              />
            );
          })
      ) : (
        <Empty
          description={`There are no trips with the ${filter} filter.`}
        />
      )}
    </Modal>
  );
};

export default TripModal;
