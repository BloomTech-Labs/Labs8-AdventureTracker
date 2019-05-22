import {useEffect, useState} from "react";
import {compose, withProps} from "recompose";
import {
  Marker as IMarker,
  Polyline as IPolyline,
  MapEvent,
} from "./interfaces/index";
import MapContext from "../context/MapContext";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Polyline,
  Marker,
} from "react-google-maps";
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";
import ProgressCircle from "./ProgressCircle";
import OptionsMenu from "./OptionsMenu";
import {useInfoWindow} from "./state-and-methods/index";
import CustomInfoWindow from "./InfoWindow/InfoWindow";
import {message} from "antd";
import {MapLoadingElement} from "./MapLoadingElement";
import {centerMarkerLabel} from "./helper-functions/index";
import SaveTripProcess from "./SaveTripProcess/SaveTripProcess";
import StepsStatusBar from "./SaveTripProcess/StepsStatusBar";
import TripModal from "./TripManager/TripModal";
import {MY_TRIP_BY_ID} from "../resolvers/Queries";
import getConfig from "next/config";
import lineReducer from "./reducers/lineReducer/lineReducer";
import markerReducer from "./reducers/markerReducer/markerReducer";
const {publicRuntimeConfig} = getConfig();
// Google Maps API doc link: https://tomchentw.github.io/react-google-maps/
const MapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      publicRuntimeConfig.GOOGLE_MAPS_API_KEY
    }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <MapLoadingElement />,
    containerElement: (
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
        }}
        className="containerElement"
      />
    ),
    mapElement: <div style={{height: "100%"}} className="mapElement" />,
  }),
  withScriptjs,
  withGoogleMap,
)(({client, tripId}) => {
  // const {
  //   //Methods
  //   addMarker,
  //   deleteMarker,
  //   setMarkerId,
  //   clearMarkerId,
  //   updateMarkerPosition,
  //   updateAllMarkerLabels,
  //   setActiveMarker,
  //   clearActiveMarker,
  //   toggleMarkerReached,
  //   setMarkers,
  //   updateMarkerLabelName,
  //   setMarkerDate,
  //   setStartingMarkers,
  //   setMarkersByTime,
  //   updateMarkerProps,
  //   setDeletedMarkerIds,
  //   //State
  //   markers,
  //   activeMarker,
  //   deletedMarkerIds,
  // } = useMarker();
  const [markState, markDispatch] = markerReducer();
  const {markers} = markState;
  const [lineState, lineDispatch] = lineReducer();
  const {lines} = lineState;
  const [isInfoWindowOpen, setInfoWindowOpen] = useState();
  // const [saveTripStep, setSaveTripStep] = useState(-1);
  // const [userPosition, setUserPosition] = useState({});
  // const {
  //   //state
  //   screenLatLng,
  //   isScreenOn,
  //   crossHairs,
  //   googleImageUrl,
  //   //methods
  //   setScreenOn,
  //   setScreenLatLng,
  //   onEndScreenCapture,
  //   setCrossHairsPosition,
  // } = useScreenCapture();

  // const {
  //   //state
  //   setTripModalOpen,
  //   //methods
  //   tripModalOpen,
  // } = useTrip();
  const [tripExists, setTripExists] = useState(false);
  useEffect(() => {
    lineDispatch({type: "UPDATE_LINES", markers: markState.markers});
    // if (markState.activeMarker.id) {
    //   markDispatch({
    //     type: "SET_ACTIVE_MARKER",
    //     marker: markState.activeMarker,
    //   });
    // }
    // const m1 = setInterval(() => {
    //   setMarkersByTime(markers);
    // }, 30000);
    // return () => {
    //   clearInterval(m1);
    // };
  }, [markers]);

  // useEffect(() => {
  //   if (saveTripStep !== 1) {
  //     setScreenOn(false);
  //   } else {
  //     setScreenOn(true);
  //   }
  // }, [saveTripStep]);
  // useEffect(() => {
  //   const fetchInitialEntities = async () => {
  //     if (tripId) {
  //       const {data} = await client.query({
  //         query: MY_TRIP_BY_ID,
  //         variables: {
  //           id: tripId,
  //         },
  //       });
  //       console.log(data);
  //       if (!data.tripById) {
  //         message.error(
  //           `Sorry either you are not logged in or the trip does not exist`,
  //         );
  //       } else {
  //         const {markers} = data.tripById;
  //         setTripExists(true);
  //         setStartingMarkers(markers);
  //         return data;
  //       }
  //     }
  //   };
  //   fetchInitialEntities();
  //   window.addEventListener("mousemove", setCrossHairsPosition);
  //   return () => {
  //     window.removeEventListener("mousemove", setCrossHairsPosition);
  //   };
  // }, []);
  // useEffect(() => {
  //   onEndScreenCapture(400, 400);
  // }, [screenLatLng]);
  return (
    <GoogleMap
      defaultZoom={6}
      onClick={e => {
        // if (!isScreenOn) {
        markDispatch({type: "ADD_MARKER", event: e});
        setInfoWindowOpen(false);
        // } else {
        // setScreenLatLng(e);
      }}
      options={{
        disableDefaultUI: true,
      }}
      defaultCenter={{lat: 31, lng: -83}}
    >
      <MapContext.Provider
        value={{
          markState,
          markDispatch,
          lineState,
          lineDispatch,
        }}
      >
        {isInfoWindowOpen && (
          <CustomInfoWindow setInfoWindowOpen={setInfoWindowOpen} />
        )}
      </MapContext.Provider>
      {/* <MapContext.Provider
        value={{
          markers
          // activeMarker,
          // markers,
          // toggleMarkerReached,
          // clearActiveMarker,
          // setMarkers,
          // setActiveMarker,
          // updateMarkerLabelName,
          // setMarkerDate,
          // setScreenOn,
          // isScreenOn,
          // crossHairs,
          // setSaveTripStep,
          // setTripModalOpen,
          // setUserPosition,
          // userPosition,
          // googleImageUrl,
          // tripExists,
          // tripId,
          // deleteMarker,
          // deletedMarkerIds,
          // setDeletedMarkerIds,
          // updateMarkerProps,
          // updateAllMarkerLabels,
          // clearMarkerId,
          // setInfoWindowOpen,
        }}
      >
        {isInfoWindowOpen && (
          <CustomInfoWindow
            activeMarker={activeMarker}
            setInfoWindowOpen={setInfoWindowOpen}
            updateMarkerProps={updateMarkerProps}
          />
        )}
        <SaveTripProcess step={saveTripStep} />
        <StepsStatusBar
          step={saveTripStep}
          setStep={setSaveTripStep}
          googleImageUrl={googleImageUrl}
        />
        {isScreenOn ? null : <OptionsMenu />}
      </MapContext.Provider>
      {isScreenOn ? null : <ProgressCircle markers={markers} />}

      <TripModal
        isModalVisible={tripModalOpen}
        setIsModalVisible={setTripModalOpen}
      />
      <Marker position={userPosition} /> */}
      {markers.map((mark: IMarker) => {
        return (
          <MarkerWithLabel
            key={mark.id}
            draggable={mark.draggable}
            position={mark.position}
            //using the length and a formula to center label on the marker
            labelAnchor={
              new google.maps.Point(
                centerMarkerLabel(mark.label.length),
                26,
              )
            }
            labelStyle={mark.labelStyle}
            icon={{
              origin: new google.maps.Point(0, 0),
              url: mark.url,
              scaledSize: new google.maps.Size(40, 60),
            }}
            date={mark.date}
            onClick={() => {
              markDispatch({type: "SET_ACTIVE_MARKER", marker: mark});
              setInfoWindowOpen(true);
            }}
            onDragStart={() => {
              setInfoWindowOpen(false);
              markDispatch({type: "SET_ACTIVE_MARKER", marker: mark});
            }}
            onDragEnd={(e: MapEvent) => {
              markDispatch({
                type: "UPDATE_MARKER",
                marker: mark,
                props: {
                  address: "",
                  position: {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                  },
                },
              });
            }}
            className="marker"
            role="marker"
          >
            <div>{mark.label}</div>
          </MarkerWithLabel>
        );
      })}
      {lines.map((line: IPolyline) => {
        return (
          <Polyline
            key={line.id}
            path={line.path}
            options={{
              strokeColor: line.strokeColor,
              strokeWeight: line.strokeWeight,
              strokeOpacity: line.strokeOpacity,
              icons: line.icons,
            }}
          />
        );
      })}
    </GoogleMap>
  );
});

export default MapComponent;
