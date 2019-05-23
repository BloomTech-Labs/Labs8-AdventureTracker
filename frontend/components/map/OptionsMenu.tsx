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
import {useContext, useState} from "react";
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
  // const {
  //   setScreenOn,
  //   setSaveTripStep,
  //   setTripModalOpen,
  //   setUserPosition,
  //   userPosition,
  //   tripExists,
  //   tripId,
  //   markers,
  //   deletedMarkerIds,
  //   setDeletedMarkerIds,
  // } = useContext(MapContext);
  const {
    markState,
    markDispatch,
    userLocationMarker,
    setUserLocationMarker,
    setIsTripModalOpen,
  } = useContext(MapContext);
  const [updateTripLoading, setUpdateTripLoading] = useState(false);
  return (
    // <Mutation
    //   mutation={UPDATE_TRIP_MUTATION}
    //   variables={{
    //     tripId: tripId,
    //     data: {
    //       markers: {
    //         delete: deletedMarkerIds,
    //         upsert: changeMarkersForUpsert(markers),
    //       },
    //     },
    //   }}
    // >
    //   {updateTrip => (
    <MainMenu>
      {/* {tripExists ? (
            <MenuItem
              disabled={updateTripLoading}
              onClick={async () => {
                const hide = message.loading("Saving trip...", 0);
                try {
                  setUpdateTripLoading(true);
                  const {data} = await updateTrip();
                  if (data) {
                    message.success("Trip was successfully updated!");
                    setDeletedMarkerIds([]);
                  }
                } catch (err) {
                  message.error("Was unable to save trip");
                } finally {
                  setUpdateTripLoading(false);
                  hide();
                }
              }}
            >
              Update Trip
            </MenuItem>
          ) : null} */}
      {/* <MenuItem
            onClick={() => {
              setScreenOn(true);
              setSaveTripStep(0);
            }}
          >
            <Icon type="save" />
            Save Trip
          </MenuItem> */}
      <MenuItem
        onClick={() => {
          setIsTripModalOpen(true);
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
          if (!userLocationMarker.isVisible) {
            confirm({
              title: "Allow access to find your location?",
              content:
                "A marker will be placed at your location,\
                this will let followers know your current position. \
                It might be in-accurate since GPS signals can be interfered with.",
              onOk() {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(position => {
                    const {coords} = position;
                    setUserLocationMarker({
                      position: {
                        lat: coords.latitude,
                        lng: coords.longitude,
                      },
                      isVisible: true,
                    });
                  });
                } else {
                  message.error(
                    "Your browser does not support finding your location.",
                  );
                }
              }, //onOK
            });
          }
        }}
      >
        {userLocationMarker.isVisible
          ? "Update my position"
          : "Update my position"}
      </MenuItem>
    </MainMenu>
    //   )}
    // </Mutation>
  );
};

export default OptionsMenu;
