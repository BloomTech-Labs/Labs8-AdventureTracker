import React from 'react';
import getConfig from 'next/config';
// const { publicRuntimeConfig } = getConfig();
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
import uuidv4 from 'uuid/v4';
import { MapBar, CalendarInput } from './MapBar';
const Label = styled.label``;
const ReachedCheckBox = styled.input`
  margin-left: 0.4em;
`;
const CheckboxGroup = styled.div`
  display: flex;
  margin: 0.4em 0;
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;
const DeleteBtn = styled.button`
  font-size: 1rem;
  padding: 0.5em 0.5em;
`;
const SaveBtn = styled.button`
  font-size: 1rem;
  padding: 0.5em 0.5em;
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
`;
const CheckedIn = styled.h2`
  font-size: 1.4rem;
  margin: 0.4em;
`;

const CheckInBox = styled(ReachedCheckBox)`
  width: 60%;
`;
const ETAGroup = styled(CheckedInGroup)`
  margin-bottom: 2em;
`;
const ETA = styled(CheckedIn)``;

const MyMapComponent = compose(
  withProps({
    // googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
    //   publicRuntimeConfig.GOOGLE_MAPS_API_KEY
    // }&v=3.exp&libraries=geometry,drawing,places`,
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `800px`, width: '50%', position: 'relative' }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    onClick={props.onMapClicked}
    defaultZoom={8}
    center={props.location}
    // bootstrapURLKeys={{ key: [serverRuntimeConfig.GOOGLE_MAPS_API_KEY] }}
  >
    <MapBar
      title={props.tripTitle}
      completedChecks={props.completedCheckboxes}
      markerAmount={props.markers.length}
      startDate={props.startDate}
      endDate={props.endDate}
      inputHandler={props.inputHandler}
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
        <InfoWrapper>
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
            <CheckedIn>Checked-in: </CheckedIn>
            <CheckInBox value={props.checkedInTime} name="checkedInTime" type="time" disabled />
          </CheckedInGroup>
          <ETAGroup>
            <ETA>ETA: </ETA>
            <CalendarInput
              type="date"
              name="etaDate"
              onChange={props.inputHandler}
              value={props.etaDate}
              onKeyDown={e => {
                e.preventDefault();
              }}
            />
            <input type="time" name="etaTime" value={props.etaTime} onChange={props.inputHandler} />
          </ETAGroup>
          <ButtonGroup>
            <SaveBtn
              onClick={() => {
                props.saveMarkerInfo();
              }}
            >
              Save Marker Info
            </SaveBtn>
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
      //   console.log(this.getPosition(e));
      // };
      return (
        <Marker
          position={mark.position}
          onClick={e => props.onMarkerClicked(e, mark)}
          key={mark.id}
          draggable={true}
          onDragStart={props.onMarkerDragStart}
          label={mark.label}
          onDrag={e => props.onMarkerDragged(e, i)}
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
  </GoogleMap>
));

class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tripTitle: '',
      startDate: '',
      endDate: '',
      showingInfoWindow: false,
      // Storing location state for centering the map based on the marker
      location: { lat: 38.9260256843898, lng: -104.755169921875 },
      activeMarker: {},
      selectedPlace: {},
      markers: [],
      checkpointName: '',
      etaTime: '',
      etaDate: '',
      checkedInTime: '',
      polylines: [],
      completedCheckboxes: 0
    };
    this.NOT_STARTED = 'NOT_STARTED';
    this.IN_PROGRESS = 'IN_PROGRESS';
    this.COMPLETED = 'COMPLETED';
    this.labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  clearActiveMarker = () => {
    this.setState({ activeMarker: {} });
  };
  //   componentDidMount() {
  //     this.delayedShowMarker();
  //   }

  //   delayedShowMarker = () => {
  //     setTimeout(() => {
  //       this.setState({ isMarkerShown: true });
  //     }, 3000);
  //   };
  convertLabelToIndex = markerLabel => {};

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
          const date = new Date();
          newMarkers[i].status = this.COMPLETED;
          newMarkers[i].checkedInTime = `${date.getHours()}:${date.getMinutes()}`;
        } else {
          newMarkers[i].status = this.NOT_STARTED;
          newMarkers[i].checkedInTime = '';
        }
        // console.log(newMarkers[i].checkedInTime);
        markerIndex = i;
        break;
      }
      // Before it reaches to the marker that we set to complete,
      // we check if the prior markers are completed
      if (newMarkers[i].status !== this.COMPLETED) {
        return;
      }
    } // for loop ends
    console.log(this.state);
    this.setState(
      { markers: newMarkers, checkedInTime: newMarkers[markerIndex].checkedInTime },
      () => {
        this.updateLines();
        this.checkBoxHandler();
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
      newMarkers[i].label.text = this.calculateLabel(i);
    }

    if (activeMarker.status === this.COMPLETED) {
      this.setState(prevState => ({ completedCheckboxes: prevState.completedCheckboxes - 1 }));
    }

    this.setState({ markers: newMarkers, showingInfoWindow: false }, this.updateLines);
  };
  createMarker = e => {
    const { markers } = this.state;

    const marker = {
      position: { lat: e.latLng.lat(), lng: e.latLng.lng() },
      id: uuidv4(),
      draggable: true,
      label: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'black',
        text: this.calculateLabel(markers.length)
      },
      // status can be NOT_STARTED or COMPLETED but NOT_STARTED is default for creation of marker
      status: this.NOT_STARTED,
      etaTime: '',
      etaDate: '',
      checkpointName: '',
      checkedInTime: ''
    };
    //What a marker looks like
    // {position: {…}, id: "27ab66d8-8ec3-46d8-9637-35ef52eebeab", draggable: true, label: "A", status: "NOT_STARTED", …}
    //   checkedIn: ""
    //   checkpointName: ""
    //   draggable: true
    //   etaDate: "2018-12-06"
    //   etaTime: "02:32"
    //   id: "27ab66d8-8ec3-46d8-9637-35ef52eebeab"
    //   label: "A"
    //   checkpointName: "abcdef"
    //   position: {lat: 39.1819690168072, lng: -105.23444848632812}
    //   status: "NOT_STARTED"}
    const newMarkers = [...this.state.markers, marker];
    this.setState({ markers: newMarkers }, this.updateLines);
  };
  onMapClicked = e => {
    const { showingInfoWindow } = this.state;

    if (showingInfoWindow === true) {
      this.setState({ showingInfoWindow: false });
    }
    this.createMarker(e);
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
        // console.log(line);
        //Depending on marker's status, this will choose what type of line to use
        if (markers[i - 1].status === this.NOT_STARTED) {
          // console.log(this.NOT_STARTED);
          lineOptions = {
            ...greyLine
          };
        } else if (
          markers[i - 1].status === this.COMPLETED &&
          markers[i].status !== undefined &&
          markers[i].status === this.NOT_STARTED
        ) {
          // console.log(this.IN_PROGRESS);
          lineOptions = {
            ...dashedLine
          };
        } else if (
          markers[i - 1].status === this.COMPLETED &&
          markers[i].status !== undefined &&
          markers[i].status === this.COMPLETED
        ) {
          // console.log(this.COMPLETED);
          lineOptions = {
            ...solidBlackLine
          };
        }
      }
      //We connect our lines
      if (i > 0) {
        lineOptions['path'] = line.slice();
        lines.push({ ...lineOptions, id: uuidv4() });
        // console.log(lines);
        //We start at the end of the new polyline and store that vertex
        line = [{ lat: markerLat, lng: markerLng }];
      }
    }
    this.setState({ polylines: lines });
  };
  onMarkerClicked = (e, marker) => {
    this.clearMarkerInfo();
    console.log(marker);
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true,
      ...marker
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
    console.log(this.state.activeMarker);
    const newMarkers = [...this.state.markers];
    const i = activeIndex;
    let newPosition = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    newMarkers[i].position = { ...newPosition };

    this.setState({ markers: newMarkers }, () => this.updateLines());
  };
  saveMarkerInfo = () => {
    const { activeMarker, markers, checkpointName, etaTime, etaDate, checkedInTime } = this.state;
    let markerIndex;
    for (let i = 0; i < markers.length; i++) {
      if (activeMarker.id === markers[i].id) {
        markerIndex = i;
        break;
      }
    }

    const editedMarker = {
      ...markers[markerIndex],
      label: {
        ...markers[markerIndex].label,
        text: checkpointName
      },
      checkpointName,
      checkedInTime,
      etaTime,
      etaDate
    };

    this.setState({
      markers: [...markers.slice(0, markerIndex), editedMarker, ...markers.slice(markerIndex + 1)],
      showingInfoWindow: false
    });
  };
  clearMarkerInfo = () => {
    this.setState({
      checkpointName: '',
      etaTime: '',
      etaDate: ''
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
      etaDate,
      etaTime,
      checkpointName,
      checkedInTime
    } = this.state;
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
        etaDate={etaDate}
        checkedInTime={checkedInTime}
        checkpointName={checkpointName}
        //methods
        clearMarkerInfo={this.clearMarkerInfo}
        clearActiveMarker={this.clearActiveMarker}
        saveMarkerInfo={this.saveMarkerInfo}
        activeMarker={this.activeMarker}
        inputHandler={this.inputHandler}
        onMapClicked={this.onMapClicked}
        activeMarker={activeMarker}
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
