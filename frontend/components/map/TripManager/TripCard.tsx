import {Card, Icon, Avatar} from "antd";
import {Mutation} from "react-apollo";
import {ARCHIVE_TRIP_MUTATION} from "../../resolvers/Mutations";

const {Meta} = Card;

interface Props {
  title: string;
  description: string;
  avatarImg: string;
  imageCoverSrc: string;
  archived: boolean;
  id: string;
}

const TripCard: React.SFC<Props> = ({
  title,
  description,
  avatarImg,
  imageCoverSrc,
  archived,
  id,
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
            <Icon
              type={archived ? "import" : "folder"}
              onClick={async () => {
                let data = await updateTrip();
                console.log(data);
              }}
            />
          )}
        </Mutation>,
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
