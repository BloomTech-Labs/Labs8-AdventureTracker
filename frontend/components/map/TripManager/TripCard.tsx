import {Card, Icon, Avatar, Button} from "antd";
import {Mutation} from "react-apollo";
import {ARCHIVE_TRIP_MUTATION} from "../../resolvers/Mutations";
import {Trip} from "../interfaces";

const {Meta} = Card;

interface Props {
  trip: Trip;
  tripDispatch: Function;
}

const TripCard: React.SFC<Props> = ({trip, tripDispatch}) => {
  const {title, description, image, archived, id} = trip;
  return (
    <Card
      bodyStyle={{width: "275px"}}
      cover={<img alt="" src={image} />}
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
                tripDispatch({
                  type: "UPDATE_TRIP",
                  tripId: id,
                  props: {
                    archived,
                  },
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
        avatar={<Avatar src={""} />}
        title={title}
        description={description}
      />
    </Card>
  );
};

export default TripCard;
