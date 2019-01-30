import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from 'react-google-maps';
import { compose, withProps, withState, withHandlers } from 'recompose';
import { Mutation, Query } from 'react-apollo';
import React, { Fragment } from 'react';
import { CREATE_MARKER_MUTATION } from './map-components/Mutations';
import { InfoWindowComponent } from './map-components/InfoWindow';
import MapBar from './map-components/MapBar';
import { CURRENT_USER_QUERY } from './User';
import { InstructionsContainer } from './map-components/styles/InstructionsContainer';

const MapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      process.env.GOOGLE_MAP_KEY !== undefined ? process.env.GOOGLE_MAP_KEY : ''
    }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%`, width: '100%', position: 'relative' }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withState('zoom', 'onZoomChange', 4),
  withState('center', 'onCenterChange', { lat: 38.9260256843898, lng: -104.755169921875 }),
  withHandlers(() => {
    const refs = {
      map: undefined
    };

    return {
      onMapMounted: () => ref => {
        refs.map = ref;
      },
      onZoomChanged: ({ onZoomChange }) => () => {
        // console.log(refs.map.getZoom());
        onZoomChange(refs.map.getZoom());
      },
      onCenterChanged: ({ onCenterChange }) => () => {
        onCenterChange(refs.map.getCenter());
      }
    };
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <Mutation
    mutation={CREATE_MARKER_MUTATION}
    variables={{
      tripId: props.tripId,
      status: 'NOT_STARTED',
      etaTime: new Date(),
      checkedInTime: new Date(),
      checkpointName: '',
      position: props.clickLocation
    }}
  >
    {(createMarkerMutation, { error, loading }) => {
     
      if (error) {
        return <p>{error}</p>;
      }
      return (
        <GoogleMap
          onClick={e => {
            props.onMapClicked(e, createMarkerMutation);
          }}
          defaultZoom={4}
          zoom={props.zoom}
          center={props.center}
          ref={props.onMapMounted}
          onZoomChanged={props.onZoomChanged}
          onCenterChanged={props.onCenterChanged}
        >
          <MapBar
            //info props
            title={props.tripTitle}
            completedChecks={props.completedCheckboxes}
            markerAmount={props.markers.length}
            markers={props.markers}
            tripId={props.tripId}
            startDate={props.startDate}
            endDate={props.endDate}
            //methods
            setStartDate={props.setStartDate}
            setEndDate={props.setEndDate}
            inputHandler={props.inputHandler}
          />
          {props.showingInfoWindow && (
            <InfoWindowComponent
              //info props
              position={props.activeMarker.position}
              etaTime={props.etaTime}
              activeMarker={props.activeMarker}
              checkpointName={props.checkpointName}
              checkedInTime={props.checkedInTime}
              //methods
              inputHandler={props.inputHandler}
              clearMarkerInfo={props.clearMarkerInfo}
              setEtaTime={props.setEtaTime}
              clearActiveMarker={props.clearActiveMarker}
              toggleInfoWindow={props.toggleInfoWindow}
              saveMarkerInfo={props.saveMarkerInfo}
              changeMarkerStatus={props.changeMarkerStatus}
              deleteMarker={props.deleteMarker}
            />
          )}
          {props.markers.map((mark, i) => {
            // This is how we use the functions that our Marker component gives us
            // https://stackoverflow.com/questions/43513518/how-call-function-getcenter-and-others-in-react-google-maps

            return (
              <Marker
                position={mark.position}
                onClick={e => {
                  props.onMarkerClicked(e, mark, mark.id);
                  // console.log('marker center: ');
                  props.onCenterChanged(props.position);
                }}
                key={mark.id}
                draggable={true}
                onDragStart={() => props.onMarkerDragStart(mark)}
                label={mark.label}
                onDrag={e => props.onMarkerDragged(e, i)}
                icon={mark.icon}
              />
            );
          })}

          {props.polylines.map(line => {
            return (
              <Polyline
                key={line.id}
                path={line.path}
                options={{
                  strokeColor: line.strokeColor,
                  strokeWeight: line.strokeWeight,
                  strokeOpacity: line.strokeOpacity,
                  icons: line.icons
                }}
              />
            );
          })}

          <InstructionsContainer>
            <div style={{ marginBottom: '16em' }}>
              <h1>Instructions for Creating a Trip</h1>
              <ul style={{ textAlign: 'center' }}>
                <li>Use the date picker to select start and end dates for your trip</li>
                <li>Click on the map to place your markers</li>
                <h4 style={{ color: 'orange' }}>**** Orange ! means late by 59 minutes or less</h4>
                <h4 style={{ color: 'red' }}>**** Red ! means late by 1 hour or more</h4>
              </ul>
            </div>
          </InstructionsContainer>
        </GoogleMap>
      );
    }}
  </Mutation>
));

export { MapComponent };
