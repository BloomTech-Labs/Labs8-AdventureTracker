import React, { Fragment } from 'react';
import { Mutation, Query } from 'react-apollo';
import { compose, withProps, withState, withHandlers } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
  InfoWindow
} from 'react-google-maps';
//react-google-maps docs: https://tomchentw.github.io/react-google-maps/
import uuidv4 from 'uuid/v4';
import { MainContainerThree } from './styles/MainContainer';

import MapBar from './map-components/MapBar';
import { CURRENT_USER_QUERY } from './User';
import { GREY_PIN, CHECKMARK_ICON, ORANGE_EXCLAMATION, RED_EXCLAMATION } from './styles/MapIcons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import {
  CREATE_MARKER_MUTATION,
  UPDATE_MARKER_MUTATION,
  UPDATE_POSITION_MUTATION,
  UPDATE_CHECKIN_MUTATION,
  POSITION_TO_UPDATE_MUTATION,
  DELETE_MARKER_MUTATION
} from './map-components/Mutations';
import { CURRENT_MARKER_QUERY, MARKER_FOR_POSITION_QUERY } from './map-components/Queries';
import { InfoWindowComponent } from './map-components/InfoWindow';

// TODO: Use Google API KEY to take it out of development mode

const MyMapComponent = compose(
  withProps({
    // googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
    //   publicRuntimeConfig.GOOGLE_MAPS_API_KEY
    // }&v=3.exp&libraries=geometry,drawing,places`,
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      process.env.GOOGLE_MAP_KEY !== undefined ? process.env.GOOGLE_MAP_KEY : ''
    }&v=3.exp&libraries=geometry,drawing,places`,
    // googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${''}&v=3.exp&libraries=geometry,drawing,places`,
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
      if (loading) {
        return <p>{loading}</p>;
      }
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
          // bootstrapURLKeys={{ key: [serverRuntimeConfig.GOOGLE_MAPS_API_KEY] }}
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

          <MainContainerThree>
            <div style={{ marginTop: '10em' }}>
              <h1>Instructions for Creating a Trip</h1>
              <ul style={{ textAlgin: 'center' }}>
                <li>Use the date picker to select start and end dates for your trip</li>
                <li>Click on the map to place your markers</li>
                <h4 style={{ color: 'orange' }}>**** Orange ! means late by 59 minutes or less</h4>
                <h4 style={{ color: 'red' }}>**** Red ! means late by 1 hour or more</h4>
              </ul>
            </div>
          </MainContainerThree>
        </GoogleMap>
      );
    }}
  </Mutation>
));

class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tripTitle: '',
      startDate: new Date(),
      endDate: new Date(),
      showingInfoWindow: false,
      // Storing location state for centering the map based on the marker
      location: { lat: 38.9260256843898, lng: -104.755169921875 },
      clickLocation: {},
      activeMarker: {},
      selectedPlace: {},
      markers: [],
      checkpointName: '',
      etaTime: new Date(),
      checkedInTime: '',
      polylines: [],
      completedCheckboxes: 0,
      tripId: ''
    };
    //Markers' Progress
    this.NOT_STARTED = 'NOT_STARTED';
    this.IN_PROGRESS = 'IN_PROGRESS';
    this.COMPLETED = 'COMPLETED';
    //Labels
    this.labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    //Colors
    this.GREEN = 'green';
    this.RED = 'red';
    this.GREY = 'grey';
    this.YELLOW = 'yellow';
    this.WHITE = 'white';
    this.BLACK = 'black';
    this.path = 'M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0';
    this.labelRegex = /\b[A-Z]\b/;
  }
  componentDidMount() {
    if (this.props.data.trip) {
      const { startDate, endDate, markers, title, id } = this.props.data.trip;

      this.setState(
        {
          startDate,
          endDate,
          tripTitle: title,
          tripId: id
        },
        () => {
          this.updateMarkersAtStart(markers);
        }
      );
    }
    const minute = 1000 * 60;
    setInterval(() => {
      const { markers } = this.state;
      if (markers.length > 0) {
        this.setMarkerColorsByDate();
      }
    }, 10000);
  }
  componentWillUnmount() {
    clearInterval();
  }
  updateMarkersAtStart = markers => {
    const now = moment();
    //set all markers to grey icons
    for (let i = 0; i < markers.length; i++) {
      let markerLabel = markers[i].checkpointName || this.calculateLabel(i);
      markers[i] = {
        ...markers[i],
        label: {
          color: this.BLACK,
          fontWeight: 'bold',
          text: markerLabel
        }
      };
      markers[i].icon = {
        ...markers[i].icon,
        url: GREY_PIN
      };
    }
    //sets the first one thats tardy
    for (let i = 0; i < markers.length; i++) {
      const eta = moment(markers[i].etaTime);
      const minutesDiff = eta.diff(now, 'minutes');
      // markers[i].icon = {
      //   ...markers[i]
      // };
      // based on eta time and current time, we need to change the marker to the right icon
      // icon property:
      // green icon needs to appear if status is true
      // GREY_PIN, CHECKMARK_ICON, ORANGE_EXCLAMATION, RED_EXCLAMATION
      // orange icon needs to appear if 59 minutes late or less
      // red icon needs to appear if an hour late or more
      // grey icon needs to appear if status is false and eta time is still later than current time
      // if (markers[i].status === this.NOT_STARTED && minutesDiff >= 0) {
      //   markers[i].icon = {
      //     ...markers[i].icon,
      //     url: GREY_PIN
      //   };
      // }

      if (markers[i].status === this.COMPLETED) {
        markers[i].icon = {
          ...markers[i].icon,
          url: CHECKMARK_ICON
        };
        continue;
      } else if (markers[i].status === this.NOT_STARTED && minutesDiff > -59 && minutesDiff < 0) {
        markers[i].icon = {
          ...markers[i].icon,
          url: ORANGE_EXCLAMATION
        };
        break;
      } else if (markers[i].status === this.NOT_STARTED && minutesDiff < -59) {
        markers[i].icon = {
          ...markers[i].icon,
          url: RED_EXCLAMATION
        };
        break;
      } else if (markers[i].status === this.NOT_STARTED) {
        break;
      }

      markers[i] = {
        ...markers[i],
        draggable: true
      };

      // if(markers[i].checkpointName.match(this.labelRegex)) {
      //   markers[i]
      // }
      // draggable property:
      // need to make draggable true

      // check if checkpointName is different from regular labels and if so then use calculateLabel to find the right letter
    }
    this.setState({ markers }, this.updateLines);
  };
  setEndDate = date => {
    this.setState({
      endDate: date
    });
  };
  setStartDate = date => {
    this.setState({
      startDate: date
    });
  };
  setEtaTime = date => {
    this.setState({
      etaTime: date
    });
  };

  clearActiveMarker = () => {
    this.setState({ activeMarker: {} });
  };

  calculateDate = (plusDay = 0, plusMonth = 0, plusYear = 0) => {
    const date = new Date();
    return `${date.getFullYear() + plusYear}-${date.getMonth() + plusMonth}-${date.getDay() +
      plusDay}`;
  };
  calculateTime = (plusMinute = 0, plusHour = 0) => {
    const date = new Date();
    return `${date.getHours() + plusHour}:${
      date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
    }`;
  };
  setMarkerColorsByDate = () => {
    const { etaTime, markers } = this.state;

    const newMarkers = [...markers];
    const now = moment();
    for (let i = 0; i < newMarkers.length; i++) {
      if (newMarkers[i].status === this.COMPLETED) {
        continue;
      }
      const eta = moment(newMarkers[i].etaTime);

      const minutesDiff = eta.diff(now, 'minutes');
      // turn marker to not tardy state
      if (minutesDiff >= 0) {
        newMarkers[i].icon = {
          ...newMarkers[i].icon,
          url: GREY_PIN
        };

        break;
      }
      //turn marker to low alert tardy state
      if (minutesDiff > -59 && minutesDiff < 0) {
        newMarkers[i].icon = {
          ...newMarkers[i].icon,
          url: ORANGE_EXCLAMATION
        };
        break;
      }
      //turn marker to high alert tardy state
      if (minutesDiff < -59) {
        newMarkers[i].icon = {
          ...newMarkers[i].icon,
          url: RED_EXCLAMATION
        };
        break;
      }
    } // for ends

    this.setState({ markers: newMarkers });
  };

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  changeMarkerStatus = checkInMutation => {
    const newMarkers = [...this.state.markers];
    const { activeMarker } = this.state;
    let markerIndex;
    for (let i = 0; i < newMarkers.length; i++) {
      if (activeMarker.id === newMarkers[i].id) {
        if (activeMarker.status === this.NOT_STARTED) {
          newMarkers[i].status = this.COMPLETED;
          newMarkers[i].checkedInTime = this.calculateTime();
          newMarkers[i].icon = {
            ...newMarkers[i].icon,
            url: CHECKMARK_ICON
          };
        } else {
          newMarkers[i].status = this.NOT_STARTED;
          newMarkers[i].checkedInTime = '';

          newMarkers[i].icon = null;
        }
        markerIndex = i;
        break;
      }
      // Before it reaches to the marker that we set to complete,
      // we check if the prior markers are completed
      if (newMarkers[i].status !== this.COMPLETED) {
        return;
      }
    } // for loop ends
    this.setState(
      { markers: newMarkers, checkedInTime: newMarkers[markerIndex].checkedInTime },
      async () => {
        await checkInMutation();
        this.updateLines();
        this.setMarkerColorsByDate();
      }
    );
  };
  //Calculates the label for the marker
  calculateLabel = letterIndex => {
    return this.labels[letterIndex % this.labels.length];
  };
  deleteMarker = markerId => {
    const { markers, activeMarker } = this.state;
    let deleteIndex;
    for (let i = 0; i < markers.length; i++) {
      if (markerId === activeMarker.id) {
        deleteIndex = i;
        break;
      }
    }
    const newMarkers = [...markers.slice(0, deleteIndex), ...markers.slice(deleteIndex + 1)];
    // Update marker labels
    for (let i = 0; i < newMarkers.length; i++) {
      if (newMarkers[i].label.text.match(this.labelRegex)) {
        newMarkers[i].label = {
          ...newMarkers[i].label,
          text: this.calculateLabel(i)
        };
      }
    }
    // if (activeMarker.status === this.COMPLETED) {
    //   this.setState(prevState => ({ completedCheckboxes: prevState.completedCheckboxes - 1 }));
    // }
    this.setState({ markers: newMarkers, showingInfoWindow: false }, this.updateLines);
  };
  createMarker = async (e, markerMutation) => {
    const { markers } = this.state;

    this.setState({ clickLocation: { lat: e.latLng.lat(), lng: e.latLng.lng() } }, async () => {
      const baseMarker = await markerMutation();
      const { clickLocation } = this.state;
      const icon = {
        origin: new google.maps.Point(0, 0),
        url: GREY_PIN
      };

      const fullMarker = {
        position: clickLocation,

        ...baseMarker.data.createMarkerMutation,
        icon: icon,
        draggable: true,
        label: {
          color: this.BLACK,
          fontWeight: 'bold',
          text: this.calculateLabel(markers.length)
        },
        status: this.NOT_STARTED,
        etaTime: new Date(),
        checkpointName: '',
        checkedInTime: ''
      };
      this.setState({ markers: [...markers, fullMarker] }, this.updateLines);
    });
  };
  onMapClicked = (e, markerMutation) => {
    const { showingInfoWindow, clickLocation } = this.state;

    if (showingInfoWindow === true) {
      this.setState({ showingInfoWindow: false });
    }
    this.createMarker(e, markerMutation);
  };
  toggleInfoWindow = () => {
    this.setState(prevState => ({
      showingInfoWindow: !prevState.showingInfoWindow
    }));
  };

  updateLines = () => {
    // thin grey is not reached yet and the person has not started that path
    const greyLine = {
      strokeWeight: 5,
      strokeColor: '#969696'
    };
    // a dashed line is in-progress, the person has started on that path
    // Doc for dashed-line: https://developers.google.com/maps/documentation/javascript/examples/overlay-symbol-dashed
    const lineSymbol = {
      path: 'M 0,-1 0, 1',
      strokeOpacity: 1,
      scale: 4
    };
    const dashedLine = {
      strokeOpacity: 0,

      icons: [
        {
          icon: lineSymbol,
          offset: '0',
          repeat: '20px'
        }
      ]
    };
    // solid black line means the path was traversed
    const solidBlackLine = {
      strokeWeight: 8,
      strokeColor: '#000000'
    };
    const lines = [];
    let line = [];
    const { markers } = this.state;
    // prepping for progress check
    this.setState({ completedCheckboxes: 0 });
    for (let i = 0; i < markers.length; i++) {
      let lineOptions = {};
      let markerLat = markers[i].position.lat;
      let markerLng = markers[i].position.lng;

      // calculate progress of trip
      if (markers[i].status === this.COMPLETED) {
        this.setState(prevState => ({ completedCheckboxes: prevState.completedCheckboxes + 1 }));
      }

      //store a vertex
      line.push({ lat: markerLat, lng: markerLng });
      //Once we have two vertices in the line array we can choose a line type
      if (line.length === 2) {
        //Depending on marker's status, this will choose what type of line to use
        if (markers[i - 1].status === this.NOT_STARTED) {
          lineOptions = {
            ...greyLine
          };
        } else if (
          markers[i - 1].status === this.COMPLETED &&
          markers[i].status !== undefined &&
          markers[i].status === this.NOT_STARTED
        ) {
          lineOptions = {
            ...dashedLine
          };
        } else if (
          markers[i - 1].status === this.COMPLETED &&
          markers[i].status !== undefined &&
          markers[i].status === this.COMPLETED
        ) {
          lineOptions = {
            ...solidBlackLine
          };
        }
      }
      //We connect our lines
      if (i > 0) {
        lineOptions['path'] = line.slice();
        lines.push({ ...lineOptions, id: uuidv4() });
        //We start at the end of the new polyline and store that vertex
        line = [{ lat: markerLat, lng: markerLng }];
      }
    }
    this.setState({ polylines: lines });
  };
  onMarkerClicked = (e, marker, markId) => {
    this.clearMarkerInfo();
    // console.log(marker);
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true,
      ...marker,
      location: marker.position
    });
  };
  shallowObjEquals = (obj1, obj2) => {
    //helper function, not used for making the app work
    return Object.keys(obj1).every(key => {
      return obj1[key] === obj2[key];
    });
  };
  onMarkerDragStart = marker => {
    this.setState({ activeMarker: marker });
  };
  onMarkerDragged = (e, activeIndex) => {
    //activeIndex comes from the dragged <Marker> component
    const newMarkers = [...this.state.markers];
    const i = activeIndex;
    let newPosition = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    newMarkers[i].position = { ...newPosition };

    this.setState({ markers: newMarkers }, () => this.updateLines());
  };
  saveMarkerInfo = updateMutation => {
    const { markers, checkpointName, etaTime, checkedInTime } = this.state;
    let markerIndex;
    for (let i = 0; i < markers.length; i++) {
      if (updateMutation.data.updateMarker.id === markers[i].id) {
        markerIndex = i;
        break;
      }
    }
    // const newText = checkpointName !== '' ? checkpointName : this.calculateLabel(markerIndex);
    // console.log('Update marker INFO: ', updateMutation.data.updateMarker);
    const editedMarker = {
      ...markers[markerIndex],
      ...updateMutation.data.updateMarker
    };

    this.setState(
      {
        markers: [
          ...markers.slice(0, markerIndex),
          editedMarker,
          ...markers.slice(markerIndex + 1)
        ],
        showingInfoWindow: false
      },
      () => {
        this.setMarkerColorsByDate();
      }
    );
  };
  clearMarkerInfo = () => {
    this.setState({
      checkpointName: '',
      etaTime: ''
    });
  };
  render() {
    const {
      markers,
      polylines,
      showingInfoWindow,
      activeMarker,
      completedCheckboxes,
      tripTitle,
      startDate,
      endDate,
      location,
      etaTime,
      checkpointName,
      checkedInTime,
      clickLocation,
      tripId
    } = this.state;

    // const { id } = this.props.data.trip;
    return (
      <MyMapComponent
        //state object props
        location={location}
        markers={markers}
        polylines={polylines}
        showingInfoWindow={showingInfoWindow}
        completedCheckboxes={completedCheckboxes}
        tripTitle={tripTitle}
        startDate={startDate}
        endDate={endDate}
        etaTime={etaTime}
        checkedInTime={checkedInTime}
        checkpointName={checkpointName}
        tripId={tripId}
        clickLocation={clickLocation}
        activeMarker={activeMarker}
        //methods
        setEtaTime={this.setEtaTime}
        setEndDate={this.setEndDate}
        setStartDate={this.setStartDate}
        clearMarkerInfo={this.clearMarkerInfo}
        clearActiveMarker={this.clearActiveMarker}
        saveMarkerInfo={this.saveMarkerInfo}
        // activeMarker={this.activeMarker}
        inputHandler={this.inputHandler}
        onMapClicked={this.onMapClicked}
        onMarkerDragStart={this.onMarkerDragStart}
        onMarkerClicked={this.onMarkerClicked}
        onMarkerDragged={this.onMarkerDragged}
        deleteMarker={this.deleteMarker}
        updateLines={this.updateLines}
        changeMarkerStatus={this.changeMarkerStatus}
        toggleInfoWindow={this.toggleInfoWindow}
      />
    );
  }
}

export { Map, MyMapComponent };
