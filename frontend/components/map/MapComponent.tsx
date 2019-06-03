import {useEffect, useState, useRef} from "react";
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
import {ProgressCircle} from "./ProgressCircle/ProgressCircle";
import OptionsMenu from "./OptionsMenu/OptionsMenu";
import CustomInfoWindow from "./InfoWindow/InfoWindow";
import {message} from "antd";
import {MapLoadingElement} from "./MapLoadingElement";
import {centerMarkerLabel} from "./lib/helpers/index";
import SaveTripProcess from "./SaveTripProcess/SaveTripProcess";
import TripModal from "./TripManager/TripModal";
import {MY_TRIP_BY_ID} from "../resolvers/Queries";
import getConfig from "next/config";
import lineReducer from "./reducers/lineReducer/lineReducer";
import markerReducer from "./reducers/markerReducer/markerReducer";
import {decideMarkerURL} from "./reducers/markerReducer/lib/helpers/index";
import saveTripReducer from "./reducers/saveTripReducer/saveTripReducer";
import LogoutBtn from "./LogoutBtn/LogoutBtn";
import Joyride from "react-joyride";
import JoyrideMapCover from "./tutorial-components/JoyrideMapCover/JoyrideMapCover";
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
  //@ts-ignore
)(({client, tripId}) => {
  const [steps, setSteps] = useState([
    {
      target: ".tutorial-step1",
      content: "Click on the map to create markers!",
      placement: "center",
    },
  ]);
  const [markState, markDispatch] = markerReducer();
  const {markers} = markState;

  const [lineState, lineDispatch] = lineReducer();
  const {lines} = lineState;
  const [saveTripState, saveTripDispatch] = saveTripReducer();
  const {saveImageModeOn, step, tripPosition} = saveTripState;
  const [isInfoWindowOpen, setInfoWindowOpen] = useState();

  const [userLocationMarker, setUserLocationMarker] = useState({
    position: {
      lat: 0,
      lng: 0,
    },
    isVisible: false,
  });
  const [tripExists, setTripExists] = useState(false);
  const [isTripModalOpen, setIsTripModalOpen] = useState(false);

  const mapRef = useRef(null);
  useEffect(() => {
    lineDispatch({type: "UPDATE_LINES", markers});
    const changeMarkerIconByDate = setInterval(() => {
      for (let i = 0; i < markers.length; i++) {
        markDispatch({
          type: "UPDATE_MARKER",
          marker: markers[i],
          props: {
            url: decideMarkerURL(markers[i]),
          },
        });
      }
    }, 30000);
    return () => {
      clearInterval(changeMarkerIconByDate);
    };
  }, [markers]);

  useEffect(() => {
    if (step !== 1) {
      saveTripDispatch({type: "SET_IMAGE_MODE", saveImageModeOn: false});
    } else {
      saveTripDispatch({type: "SET_IMAGE_MODE", saveImageModeOn: true});
    }
  }, [step]);
  useEffect(() => {
    const fetchInitialEntities = async () => {
      if (tripId) {
        const hide = message.loading("Fetching Trip", 0);
        try {
          const {data} = await client.query({
            query: MY_TRIP_BY_ID,
            fetchPolicy: "no-cache",
            variables: {
              id: tripId,
            },
          });

          const {markers, lat, lng} = data.tripById;
          setTripExists(true);
          setIsTripModalOpen(false);
          saveTripDispatch({
            type: "SAVE_TRIP_POSITION",
            tripPosition: {
              lat,
              lng,
            },
          });
          markDispatch({
            type: "SET_MARKERS_FROM_DATABASE",
            queryMarkers: markers,
          });
          message.success("Trip has successfully loaded");
        } catch (err) {
          message.error(err.message);
        } finally {
          hide();
        }
      }
    };
    fetchInitialEntities();
  }, [tripId]);
  return (
    <GoogleMap
      defaultZoom={6}
      ref={mapRef}
      onClick={e => {
        if (!saveImageModeOn) {
          markDispatch({type: "ADD_MARKER", event: e});
          setInfoWindowOpen(false);
        } else {
          const {lat, lng} = e.latLng;
          saveTripDispatch({
            type: "SAVE_TRIP_IMAGE",
            urlProps: {
              lat: lat() || 0,
              lng: lng() || 0,
              width: 400,
              height: 400,
              zoom: 6,
              imgFormat: "jpg",
              mapType: "roadmap",
              apiKey: publicRuntimeConfig.GOOGLE_MAPS_API_KEY,
            },
          });
        }
      }}
      options={{
        disableDefaultUI: true,
      }}
      onCenterChanged={() => {
        // console.log(mapRef.current.getCenter());
        const {lat, lng} = (mapRef.current as any).getCenter();
        saveTripDispatch({
          type: "SAVE_TRIP_POSITION",
          tripPosition: {
            lat: lat(),
            lng: lng(),
          },
        });
      }}
      center={{
        lat: tripPosition.lat,
        lng: tripPosition.lng,
      }}
    >
      //@ts-ignore
      <Joyride steps={steps} run={true} spotlightClicks />
      <JoyrideMapCover className="tutorial-step1" />
      <MapContext.Provider
        value={{
          markState,
          markDispatch,
          lineState,
          lineDispatch,
          saveTripState,
          saveTripDispatch,
          setInfoWindowOpen,
          userLocationMarker,
          setUserLocationMarker,
          setIsTripModalOpen,
          tripExists,
          setTripExists,
          tripId,
          client,
        }}
      >
        {isInfoWindowOpen && (
          <CustomInfoWindow setInfoWindowOpen={setInfoWindowOpen} />
        )}
        <OptionsMenu />
        <SaveTripProcess />
      </MapContext.Provider>
      <ProgressCircle markers={markers} />
      <LogoutBtn client={client} />
      <TripModal
        isModalVisible={isTripModalOpen}
        setIsModalVisible={setIsTripModalOpen}
        client={client}
        tripId={tripId}
      />
      {userLocationMarker.isVisible ? (
        <Marker position={userLocationMarker.position} />
      ) : null}
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
            labelStyle={mark.label.length ? mark.labelStyle : {}}
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
