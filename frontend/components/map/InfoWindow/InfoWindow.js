import {Button, Card, Divider, Checkbox, Modal} from "antd";
import {InfoWindow, GoogleMap} from "react-google-maps";
import {useRef, useEffect} from "react";
import styled from "styled-components";
import ReachedCheckbox from "./ReachedCheckbox";
import MarkerNameInput from "./MarkerNameInput";
import ArrivalDatePicker from "./ArrivalDatePicker";
import getReverseGeocoding from "../../../lib/requestEndpoints/getReverseGeocoding";
import MarkerOptions from "./MarkerOptions";

const confirm = Modal.confirm;
const CustomInfoWindow = ({
  activeMarker,
  setInfoWindowOpen,
  updateMarkerProps,
}) => {
  const position =
    activeMarker.position !== undefined
      ? activeMarker.position
      : {lat: 0, lng: 0};
  const {lat, lng} = activeMarker.position;
  return (
    <StyledInfoWindow
      position={{lat: position.lat, lng: position.lng}}
      options={{
        pixelOffset: new google.maps.Size(0, -60),
        disableAutoPan: false,
      }}
      activeMarker={activeMarker}
    >
      <>
        <ExitBtn
          type="danger"
          onClick={() => {
            setInfoWindowOpen(false);
          }}
        >
          Close
        </ExitBtn>
        <StyledCard
          bodyStyle={{
            display: "flex",
            flexDirection: "column",
            padding: "0",
            marginTop: "32px",
          }}
        >
          <CardGrid style={{border: "none"}}>
            <MarkerNameInput />
          </CardGrid>
          <CardGrid>
            <ArrivalDatePicker />
          </CardGrid>
          <CardGrid>
            <ReachedCheckbox />
          </CardGrid>
          <CardGrid>
            <Button
              onClick={async () => {
                const {address} = await getReverseGeocoding(lat, lng);
                updateMarkerProps(activeMarker, {
                  address: address.display_name,
                });
              }}
              style={{marginBottom: "12px"}}
            >
              Generate Marker Address
            </Button>
            {activeMarker.address ? <p>{activeMarker.address}</p> : null}
          </CardGrid>
          <CardGrid style={{display: "flex", flexDirection: "column"}}>
            <MarkerOptions />
          </CardGrid>
        </StyledCard>
      </>
    </StyledInfoWindow>
  );
};
const StyledCard = styled(Card)`
  .ant-card-bordered {
    border: none;
  }
`;
const ExitBtn = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10000;
  border-top-left-radius: 0;
`;
const CardGrid = styled(Card.Grid)`
  width: 100%;
  margin: 0;
  .ant-card-grid:hover {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
`;
const StyledInfoWindow = styled(InfoWindow)`
  position: relative;
  margin: 0;
  min-width: 1000px;
`;
export default CustomInfoWindow;
