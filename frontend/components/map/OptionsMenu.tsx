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

const confirm = Modal.confirm;

const OptionsMenuWrapper = styled.div`
  position: absolute;
  left: 3%;
  bottom: 5%;
`;
//@ts-ignore
const OptionsMenu = props => (
  <OptionsMenuWrapper>
    <Dropdown overlay={<OverlayMenu />} placement="topLeft">
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
  } = useContext(MapContext);
  return (
    <MainMenu>
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
          function getUserLocation() {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(position => {
                console.log(position);
                const {coords} = position;
                setUserPosition({
                  lat: coords.latitude,
                  lng: coords.longitude,
                });
              });
              return {status: "success"};
            } else {
              return {status: "failed"};
            }
          }
          confirm({
            title: "Allow access to find your location?",
            content:
              "A marker will be placed at your location. This will let followers know your current position.",
            onOk() {
              const statusObj = getUserLocation();
              if (statusObj.status === "failed") {
                message.error("We could not get your location.");
              }
            },
            onCancel() {
              console.log("Cancel");
            },
          });
        }}
      >
        <Icon type="link" /> Mark my position
      </MenuItem>
    </MainMenu>
  );
};

export default OptionsMenu;
