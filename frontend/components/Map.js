import React from 'react';
import getConfig from 'next/config';
// const { publicRuntimeConfig } = getConfig();
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
  InfoWindow
} from 'react-google-maps';
//react-google-maps docs: https://tomchentw.github.io/react-google-maps/
import styled from 'styled-components';
import { MainContainerThree } from './styles/MainContainer';
import uuidv4 from 'uuid/v4';
import { MapBar } from './MapBar';
import { GREY_PIN, CHECKMARK_ICON, ORANGE_EXCLAMATION, RED_EXCLAMATION } from './styles/MapIcons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const Label = styled.label``;

const ReachedCheckBox = styled.input`
  margin-bottom: 0.4em;
`;
const CheckboxGroup = styled.div`
  display: flex;
  margin: 0.2em 0;
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;
const DeleteBtn = styled.button`
  font-size: 1rem;
  padding: 0.5em 0.5em;
  border: 0;
  color: ${props => props.theme.black};
  background: #ff6262;
`;
const SaveBtn = styled.button`
  font-size: 1rem;
  padding: 0.5em 0.5em;
  font-size: 1.3rem;
  margin: .5rem;
  border: 0;
  background: ${props => props.theme.blue};
  color: ${props => props.theme.white};
`;
const MarkerNameLabel = styled.label`
  margin-bottom: 0.4em;
`;
const MarkerNameBox = styled.input`
  height: 3rem;
  width: 100%;
  margin-bottom: 0.6em;
`;
const MarkerNameGroup = styled.div``;
const InfoWrapper = styled.div`
  display: flex;
  flex-flow: column;
`;

const CheckedInGroup = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 1em;
`;
const CheckedIn = styled.label`
  font-size: 1.4rem;
  margin-bottom: 0.4em;
`;

const CheckInBox = styled(ReachedCheckBox)`
  width: 60%;
`;
const ETAGroup = styled(CheckedInGroup)`
  & > * {
    margin-bottom: 0.5em;
  }
  margin-bottom: 1.5em;
`;
const ETA = styled(CheckedIn)``;

const CREATE_MARKER_MUTATION = gql`
  mutation CREATE_MARKER_MUTATION(
    $tripId: ID!
    $status: Progress!
    $etaTime: DateTime!
    $checkedInTime: DateTime!
    $checkpointName: String!
    $position: PositionCreateWithoutMarkerInput!
  ) {
    createMarkerMutation(
      tripId: $tripId
      status: $status
      etaTime: $etaTime
      checkedInTime: $checkedInTime
      checkpointName: $checkpointName
      position: $position
    ) {
      id
      status
      etaTime
      checkedInTime
      checkpointName
    }
  }
`;

const UPDATE_MARKER_MUTATION = gql`
  mutation UPDATE_MARKER_MUTATION(
    $markerId: ID!
    $status: Progress!
    $etaTime: DateTime!
    $checkpointName: String!
  ) {
    updateMarker(
      markerId: $markerId
      status: $status
      etaTime: $etaTime
      checkpointName: $checkpointName
    ) {
      id
    }
  }
`;

const MyMapComponent = compose(
  withProps({
    // googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
    //   publicRuntimeConfig.GOOGLE_MAPS_API_KEY
    // }&v=3.exp&libraries=geometry,drawing,places`,
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%`, width: '100%', position: 'relative' }} />,
    mapElement: <div style={{ height: `100%` }} />
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
          defaultZoom={8}
          center={props.location}
          // bootstrapURLKeys={{ key: [serverRuntimeConfig.GOOGLE_MAPS_API_KEY] }}
        >
          <MapBar
            title={props.tripTitle}
            completedChecks={props.completedCheckboxes}
            markerAmount={props.markers.length}
            markers={props.markers}
            startDate={props.startDate}
            endDate={props.endDate}
            setStartDate={props.setStartDate}
            setEndDate={props.setEndDate}
            inputHandler={props.inputHandler}
            tripId={props.tripId}
          />
          {props.showingInfoWindow && (
            <InfoWindow
              position={props.activeMarker.position}
              onCloseClick={() => {
                props.toggleInfoWindow();
                props.clearActiveMarker();
                props.clearMarkerInfo();
              }}
            >
              <InfoWrapper
                onKeyDown={e => {
                  if (e.keyCode === 13) {
                    props.saveMarkerInfo();
                  }
                }}
              >
                <div className="container">
                  <h2>Click on the markers to give your waypoints a name and ETA</h2>
                </div>
                <MarkerNameGroup>
                  <MarkerNameLabel htmlFor="location">Checkpoint Name?</MarkerNameLabel>
                  <MarkerNameBox
                    name="checkpointName"
                    onChange={props.inputHandler}
                    value={props.checkpointName}
                    id="location"
                    type="text"
                  />
                </MarkerNameGroup>
                <ETAGroup>
                  <ETA>ETA: </ETA>
                  <DatePicker
                    selected={props.etaTime}
                    onChange={props.setEtaTime}
                    showTimeSelect
                    timeIntervals={15}
                    dateFormat="MM/dd/YYYY, h:mm aa"
                    timeCaption="Time"
                    onKeyDown={e => {
                      e.preventDefault();
                    }}
                  />
                  {/* <input type="time" name="etaTime" value={props.etaTime} onChange={props.inputHandler} /> */}
                  <Mutation
                    mutation={UPDATE_MARKER_MUTATION}
                    variables={{
                      markerId: props.activeMarker.id,
                      status: props.activeMarker.status,
                      etaTime: props.etaTime,
                      checkpointName: props.checkpointName
                    }}
                    // todo: add refetchQueries
                    // refetchQueries={[{ query: CURRENT_USER_QUERY }]}
                  >
                    {(updateMarker, { error, loading }) => {
                      if (loading) {
                        return <p>{loading}</p>;
                      }
                      if (error) {
                        return <p>{error}</p>;
                      }
                      return (
                        <SaveBtn
                          onClick={async () => {
                            await updateMarker();
                            props.saveMarkerInfo();
                          }}
                        >
                          Save Marker Info
                        </SaveBtn>
                      );
                    }}
                  </Mutation>
                </ETAGroup>
                <CheckboxGroup>
                  <Label htmlFor="reached-checkbox">Reached Checkpoint?</Label>
                  <ReachedCheckBox
                    onChange={props.changeMarkerStatus}
                    id="reached-checkbox"
                    type="checkbox"
                    checked={props.activeMarker.status === 'COMPLETED' ? true : false}
                    value={props.checkedInTime}
                  />
                </CheckboxGroup>
                <CheckedInGroup>
                  <CheckedIn htmlFor="checked-in">Checked-in: </CheckedIn>
                  <CheckInBox
                    id="checked-in"
                    value={props.checkedInTime}
                    name="checkedInTime"
                    type="time"
                    disabled
                  />
                </CheckedInGroup>
                <ButtonGroup>
                  <DeleteBtn onClick={() => props.deleteMarker(props.activeMarker)}>
                    Delete Marker?
                  </DeleteBtn>
                </ButtonGroup>
              </InfoWrapper>
            </InfoWindow>
          )}
          {props.markers.map((mark, i) => {
            // This is how we use the functions that our Marker component gives us
            // https://stackoverflow.com/questions/43513518/how-call-function-getcenter-and-others-in-react-google-maps
            // const click = function(e) {
            // };
            return (
              <Marker
                position={mark.position}
                onClick={e => props.onMarkerClicked(e, mark, mark.id)}
                key={mark.id}
                draggable={true}
                onDragStart={props.onMarkerDragStart}
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
            <div style={{ marginBottom: '14em' }}>
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
      startDate: Number(new Date()),
      endDate: Number(new Date()),
      showingInfoWindow: false,
      // Storing location state for centering the map based on the marker
      location: { lat: 38.9260256843898, lng: -104.755169921875 },
      clickLocation: {},
      activeMarker: {},
      selectedPlace: {},
      markers: [],
      checkpointName: '',
      etaTime: Number(new Date()),
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
        break;
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
  checkBoxHandler = () => {
    const { activeMarker } = this.state;
    if (activeMarker.status === this.COMPLETED) {
      this.setState(prevState => ({ completedCheckboxes: prevState.completedCheckboxes + 1 }));
    } else {
      this.setState(prevState => ({ completedCheckboxes: prevState.completedCheckboxes - 1 }));
    }
  };
  changeMarkerStatus = () => {
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
      () => {
        this.updateLines();
        this.checkBoxHandler();
        this.setMarkerColorsByDate();
      }
    );
  };
  //Calculates the label for the marker
  calculateLabel = letterIndex => {
    return this.labels[letterIndex % this.labels.length];
  };
  deleteMarker = activeMarker => {
    const { markers } = this.state;
    let deleteIndex;
    for (let i = 0; i < markers.length; i++) {
      if (markers[i].id === activeMarker.id) {
        deleteIndex = i;
        break;
      }
    }
    const newMarkers = [...markers.slice(0, deleteIndex), ...markers.slice(deleteIndex + 1)];
    // Update marker labels
    for (let i = 0; i < newMarkers.length; i++) {
      if (newMarkers[i].checkpointName.match(this.labelRegex)) {
        newMarkers[i].label = {
          ...newMarkers[i].label,
          text: this.calculateLabel(i)
        };
      }
    }
    if (activeMarker.status === this.COMPLETED) {
      this.setState(prevState => ({ completedCheckboxes: prevState.completedCheckboxes - 1 }));
    }

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
          color: this.WHITE,
          fontWeight: 'bold',
          backgroundColor: this.BLACK,
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
    for (let i = 0; i < markers.length; i++) {
      let lineOptions = {};
      let markerLat = markers[i].position.lat;
      let markerLng = markers[i].position.lng;

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
    console.log(marker);
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
  onMarkerDragStart = () => {
    this.setState({ activeMarker: {} });
  };
  onMarkerDragged = (e, activeIndex) => {
    //activeIndex comes from the dragged <Marker> component
    const newMarkers = [...this.state.markers];
    const i = activeIndex;
    let newPosition = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    newMarkers[i].position = { ...newPosition };

    this.setState({ markers: newMarkers }, () => this.updateLines());
  };
  saveMarkerInfo = () => {
    const { activeMarker, markers, checkpointName, etaTime, checkedInTime } = this.state;
    let markerIndex;
    for (let i = 0; i < markers.length; i++) {
      if (activeMarker.id === markers[i].id) {
        markerIndex = i;
        break;
      }
    }
    const newText = checkpointName !== '' ? checkpointName : this.calculateLabel(markerIndex);
    const editedMarker = {
      ...markers[markerIndex],
      label: {
        ...markers[markerIndex].label,
        text: newText
      },
      checkpointName,
      checkedInTime,
      etaTime
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
        checkBoxHandler={this.checkBoxHandler}
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
