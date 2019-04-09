import {Modal} from "antd";
import TripCard from "./TripCard";
import {useState} from "react";
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
            <TripFilter client={client} setTrips={setTrips} />
            {trips !== undefined
              ? trips.map((trip: Trip) => {
                  return (
                    <TripCard
                      key={trip.id}
                      id={trip.id}
                      title={trip.title}
                      description={trip.description}
                      avatarImg={trip.avatarImg}
                      imageCoverSrc={trip.imageCoverSrc}
                      archived={trip.archived}
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
