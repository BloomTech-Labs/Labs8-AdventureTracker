import {Menu, Dropdown, Button, Icon, message, Modal} from "antd";
import styled from "styled-components";
import {useContext} from "react";
//@ts-ignore
import {CopyToClipboard} from "react-copy-to-clipboard";
import MapContext from "../../context/MapContext";
import optionsMenuReducer from "./optionsMenuReducer";
import {UPDATE_TRIP_MUTATION} from "../../resolvers/Mutations";
import {changeMarkersForUpsert} from "../lib/helpers/changeMarkersForUpsert";
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
    markState,
    markDispatch,
    tripExists,
    saveTripDispatch,
    client,
    tripId,
    userLocationMarker,
    setUserLocationMarker,
    setIsTripModalOpen,
  } = useContext(MapContext);
  const {deletedMarkersIdsFromDB, markers} = markState;
  const [menuState, menuDispatch] = optionsMenuReducer();
  const {isUpdating} = menuState;
  return (
    <MainMenu>
      {tripExists ? (
        <MenuItem
          disabled={isUpdating}
          onClick={async () => {
            const hide = message.loading("Saving trip...", 0);
            console.log(client);
            try {
              console.log(deletedMarkersIdsFromDB, markers, tripId);
              menuDispatch({type: "UPDATING_TRIP"});
              const {data} = await client.mutate({
                mutation: UPDATE_TRIP_MUTATION,
                variables: {
                  id: tripId,
                  data: {
                    markers: {
                      delete: deletedMarkersIdsFromDB,
                      upsert: changeMarkersForUpsert(markers),
                    },
                  },
                },
              });
              console.log(data);
              message.success("Trip was successfully updated!");
              menuDispatch({type: "UPDATED_TRIP"});
              markDispatch({type: "EMPTY_DELETED_DB_MARKERS_IDS"});
            } catch (err) {
              menuDispatch({type: "UPDATE_TRIP_ERROR"});
              message.error(err.message);
            }
            hide();
          }}
        >
          <Icon type="upload" />
          Update Trip
        </MenuItem>
      ) : null}
      <MenuItem
        onClick={() => {
          saveTripDispatch({type: "SET_STEP", step: 0});
        }}
      >
        <Icon type="save" />
        Save Trip
      </MenuItem>
      <MenuItem
        onClick={() => {
          setIsTripModalOpen(true);
        }}
      >
        <Icon type="bars" />
        Trips
      </MenuItem>
      {/* <MenuItem>
        <Icon type="user" />
        <Badge count={1} offset={[15, 7]}>
          Followers
        </Badge>
      </MenuItem> */}
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
        Update my position
      </MenuItem>
    </MainMenu>
  );
};

export default OptionsMenu;
