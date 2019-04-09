import {Modal} from "antd";
import TripCard from "./TripCard";
import {useState, useEffect} from "react";
import {ApolloConsumer} from "react-apollo";
import TripFilter from "./TripFilter";
interface Trip {
  id: string;
  title: string;
  description: string;
  avatarImg: string;
  imageCoverSrc: string;
  archived: boolean;
}
interface Props {
  isModalVisible: boolean;
  setIsModalVisible: Function;
}

const TripModal: React.SFC<Props> = ({
  isModalVisible,
  setIsModalVisible,
}) => {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const ALL = "all";
  const ACTIVE = "active";
  const ARCHIVED = "archived";
  const [status, setStatus] = useState(ACTIVE);

  useEffect(() => {
    if (status === ACTIVE) {
      setFilteredTrips(
        trips.filter((trip: Trip) => {
          return trip.archived === false;
        }),
      );
    } else if (status === ARCHIVED) {
      setFilteredTrips(
        trips.filter((trip: Trip) => {
          return trip.archived === true;
        }),
      );
    } else if (status === ALL) {
      setFilteredTrips(trips);
    }
  }, [trips, status]);
  return (
    <ApolloConsumer>
      {client => {
        return (
          <Modal
            title="Trips"
            visible={isModalVisible}
            onOk={() => {
              setIsModalVisible(false);
            }}
            onCancel={() => setIsModalVisible(false)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TripFilter
              client={client}
              setTrips={setTrips}
              trips={trips}
              setStatus={setStatus}
              filterTypes={{ALL, ACTIVE, ARCHIVED}}
            />
            {filteredTrips !== undefined
              ? filteredTrips.map((trip: Trip) => {
                  return (
                    <TripCard
                      key={trip.id}
                      id={trip.id}
                      title={trip.title}
                      description={trip.description}
                      avatarImg={trip.avatarImg}
                      imageCoverSrc={trip.imageCoverSrc}
                      archived={trip.archived}
                      setTrips={setTrips}
                    />
                  );
                })
              : null}
          </Modal>
        );
      }}
    </ApolloConsumer>
  );
};

export default TripModal;
