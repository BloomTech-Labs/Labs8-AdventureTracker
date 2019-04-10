import {Card, Icon, Avatar, Button} from "antd";
import {Mutation} from "react-apollo";
import {ARCHIVE_TRIP_MUTATION} from "../../resolvers/Mutations";
import {Trip} from "../interfaces";

const {Meta} = Card;

interface Props {
  title: string;
  description: string;
  avatarImg: string;
  imageCoverSrc: string;
  archived: boolean;
  id: string;
  setTrips: Function;
}

const TripCard: React.SFC<Props> = ({
  title,
  description,
  avatarImg,
  imageCoverSrc,
  archived,
  id,
  setTrips,
}) => {
  return (
    <Card
      style={{width: 300}}
      cover={<img alt="" src={imageCoverSrc} />}
      actions={[
        <Mutation
          mutation={ARCHIVE_TRIP_MUTATION}
          variables={{tripId: id, data: {archived: !archived}}}
        >
          {(updateTrip, {loading}) => (
            <Button
              onClick={async () => {
                //@ts-ignore
                let {data} = await updateTrip();
                const {id, archived} = data.updateTrip;
                setTrips((trips: any) => {
                  const updateIndex = trips.findIndex((trip: Trip) => {
                    return trip.id === id;
                  });
                  const updatedTrip = {
                    ...trips[updateIndex],
                    archived,
                  };
                  return [
                    ...trips.slice(0, updateIndex),
                    updatedTrip,
                    ...trips.slice(updateIndex + 1),
                  ];
                });
              }}
            >
              <Icon
                type={loading ? "loading" : archived ? "import" : "folder"}
              />
              {archived ? "Restore" : "Archive"}
            </Button>
          )}
        </Mutation>,
        <Button
          type="primary"
          onClick={() => {
            window.location.href = `/map?id=${id}`;
          }}
        >
          Go To Trip
        </Button>,
      ]}
    >
      <Meta
        avatar={<Avatar src={avatarImg} />}
        title={title}
        description={description}
      />
    </Card>
  );
};

export default TripCard;
