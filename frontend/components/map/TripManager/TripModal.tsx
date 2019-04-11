import {Modal, Button} from "antd";
import TripCard from "./TripCard";
import {useState, useEffect} from "react";
import {ApolloConsumer} from "react-apollo";
import TripFilter from "./TripFilter";
import {Trip} from "../interfaces";
import tripPlaceholderImg from "static/trip-placeholder.jpg";
import TripList from "./TripList";
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
            bodyStyle={{
              display: "flex",
              flexDirection: "column",
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
              client={client}
              setTrips={setTrips}
              trips={trips}
              setStatus={setStatus}
              filterTypes={{ALL, ACTIVE, ARCHIVED}}
            />
            <TripList>
              {filteredTrips !== undefined
                ? filteredTrips.map((trip: Trip) => {
                    return (
                      <TripCard
                        key={trip.id}
                        id={trip.id}
                        title={trip.title}
                        description={trip.description}
                        avatarImg={trip.avatarImg}
                        imageCoverSrc={
                          trip.image === ""
                            ? tripPlaceholderImg
                            : trip.image
                        }
                        archived={trip.archived}
                        setTrips={setTrips}
                      />
                    );
                  })
                : null}
            </TripList>
          </Modal>
        );
      }}
    </ApolloConsumer>
  );
};

export default TripModal;
