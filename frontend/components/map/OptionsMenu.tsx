import {
  Menu,
  Dropdown,
  Button,
  Icon,
  Avatar,
  Badge,
  message,
  Modal,
} from "antd";
import styled from "styled-components";
import {useContext} from "react";
//@ts-ignore
import {CopyToClipboard} from "react-copy-to-clipboard";
import MapContext from "../context/MapContext";
import {getUserLocation} from "./helper-functions/index";
import {Mutation} from "react-apollo";
import {UPDATE_TRIP_MUTATION} from "../resolvers/Mutations";
import {changeMarkersForUpsert} from "../helpers/graphql/updateTrip";

const confirm = Modal.confirm;

const OptionsMenuWrapper = styled.div`
  position: absolute;
  left: 3%;
  bottom: 5%;
`;
//@ts-ignore
const OptionsMenu = props => (
  <OptionsMenuWrapper>
    <Dropdown
      overlay={<OverlayMenu />}
      placement="topLeft"
      trigger={["click", "hover"]}
    >
      <Button type="primary" size="large">
        <Icon type="plus-circle" theme="filled" />
        Menu
      </Button>
    </Dropdown>
  </OptionsMenuWrapper>
);

//The menu that appears when OptionsMenu has been hovered
const MenuItem = styled(Menu.Item)`
  background: ${props => props.theme.white};
`;
const MainMenu = styled(Menu)`
  width: 150px;
  background: none;
  border: none;
`;

//@ts-ignore
const OverlayMenu = props => {
  const {
    setScreenOn,
    setSaveTripStep,
    setTripModalOpen,
    setUserPosition,
    userPosition,
    tripExists,
    tripId,
    markers,
  } = useContext(MapContext);
  console.log(tripExists);
  return (
    <Mutation
      mutation={UPDATE_TRIP_MUTATION}
      variables={{
        tripId: tripId,
        data: {
          markers: {
            upsert: changeMarkersForUpsert(markers),
          },
        },
      }}
    >
      {updateTrip => (
        <MainMenu>
          {tripExists ? (
            <MenuItem
              onClick={() => {
                updateTrip();
              }}
            >
              Update Trip
            </MenuItem>
          ) : null}
          <MenuItem
            onClick={() => {
              setScreenOn(true);
              setSaveTripStep(0);
            }}
          >
            <Icon type="save" />
            Save Trip
          </MenuItem>
          <MenuItem
            onClick={() => {
              setTripModalOpen(true);
            }}
          >
            <Icon type="bars" />
            Trips
          </MenuItem>
          <MenuItem>
            <Icon type="user" />
            <Badge count={1} offset={[15, 7]}>
              Followers
            </Badge>
          </MenuItem>
          <CopyToClipboard text={window.location.href}>
            <MenuItem
              onClick={() => {
                message.success("Link has been copied to clipboard!");
              }}
            >
              <Icon type="link" /> Share
            </MenuItem>
          </CopyToClipboard>
          <MenuItem
            onClick={() => {
              if (!userPosition.lat) {
                confirm({
                  title: "Allow access to find your location?",
                  content:
                    "A marker will be placed at your location,\
                this will let followers know your current position. \
                It might be in-accurate since GPS signals can be interfered with.",
                  onOk() {
                    const statusObj = getUserLocation(setUserPosition);
                    if (statusObj.status === "failed") {
                      message.error("We could not get your location.");
                    }
                  },
                });
              } else {
                const statusObj = getUserLocation(setUserPosition);
                if (statusObj.status === "failed") {
                  message.error("We could not get your location.");
                }
              }
            }}
          >
            {userPosition.lat ? "Update my position" : "Mark my position"}
          </MenuItem>
        </MainMenu>
      )}
    </Mutation>
  );
};

export default OptionsMenu;
