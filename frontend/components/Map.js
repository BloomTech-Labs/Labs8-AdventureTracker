import React from 'react';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
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
import { runInThisContext } from 'vm';
import uuidv4 from 'uuid/v4';
import MapBar from './MapBar';
const Label = styled.label``;
const ReachedCheckBox = styled.input``;
const DeleteBtn = styled.button`
  font-size: 1rem;
  padding: 0.5em 0.5em;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-flow: column;
`;

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
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    // bootstrapURLKeys={{ key: [serverRuntimeConfig.GOOGLE_MAPS_API_KEY] }}
  >
    <MapBar
      title={props.tripTitle}
      completedChecks={props.completedCheckboxes}
      markerAmount={props.markers.length}
    />
    {props.showingInfoWindow && (
      <InfoWindow position={props.activeMarker.position}>
        <InfoWrapper>
          <Label htmlFor="reached-checkbox">Reached Checkpoint?</Label>
          <ReachedCheckBox
            onChange={props.changeMarkerStatus}
            id="reached-checkbox"
            type="checkbox"
            checked={props.activeMarker.status === 'COMPLETED' ? true : false}
          />
          <DeleteBtn onClick={() => props.deleteMarker(props.activeMarker)}>
            Delete Marker?
          </DeleteBtn>
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
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      markers: [],
      polylines: [],
      completedCheckboxes: 0
    };
    this.NOT_STARTED = 'NOT_STARTED';
    this.IN_PROGRESS = 'IN_PROGRESS';
    this.COMPLETED = 'COMPLETED';
    this.labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  //   componentDidMount() {
  //     this.delayedShowMarker();
  //   }

  //   delayedShowMarker = () => {
  //     setTimeout(() => {
  //       this.setState({ isMarkerShown: true });
  //     }, 3000);
  //   };
  convertLabelToIndex = markerLabel => {};
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
    for (let i = 0; i < newMarkers.length; i++) {
      if (activeMarker.id === newMarkers[i].id) {
        newMarkers[i].status =
          activeMarker.status === this.NOT_STARTED ? this.COMPLETED : this.NOT_STARTED;
        break;
      }
      // Before it reaches to the marker that we set to complete,
      // we check if the prior markers are completed
      if (newMarkers[i].status !== this.COMPLETED) {
        return;
      }
    }
    this.setState({ markers: newMarkers }, () => {
      this.updateLines();
      this.checkBoxHandler();
    });
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
      newMarkers[i].label = this.calculateLabel(i);
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
      label: this.calculateLabel(markers.length),
      // status can be NOT_STARTED, IN_PROGRESS, or COMPLETED but NOT_STARTED is default for creation of marker
      status: this.NOT_STARTED
    };
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
        console.log(lines);
        //We start at the end of the new polyline and store that vertex
        line = [{ lat: markerLat, lng: markerLng }];
      }
    }
    this.setState({ polylines: lines });
  };
  onMarkerClicked = (e, marker) => {
    // console.log(marker, this.state.showingInfoWindow);
    this.setState({ activeMarker: marker, showingInfoWindow: true });
  };
  shallowObjEquals = (obj1, obj2) => {
    //helper function, not used for making the app work
    return Object.keys(obj1).every(key => {
      return obj1[key] === obj2[key];
    });
  };

  onMarkerDragged = (e, activeIndex) => {
    //activeIndex comes from the dragged <Marker> component
    const newMarkers = [...this.state.markers];
    const i = activeIndex;
    let newPosition = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    newMarkers[i].position = { ...newPosition };

    this.setState({ markers: newMarkers }, () => this.updateLines());
  };
  render() {
    const {
      markers,
      polylines,
      showingInfoWindow,
      activeMarker,
      completedCheckboxes,
      tripTitle
    } = this.state;
    return (
      <MyMapComponent
        //state object props
        markers={markers}
        polylines={polylines}
        showingInfoWindow={showingInfoWindow}
        completedCheckboxes={completedCheckboxes}
        checkBoxHandler={this.checkBoxHandler}
        tripTitle={this.tripTitle}
        //methods
        onMapClicked={this.onMapClicked}
        activeMarker={activeMarker}
        onMarkerClicked={this.onMarkerClicked}
        onMarkerDragged={this.onMarkerDragged}
        deleteMarker={this.deleteMarker}
        updateLines={this.updateLines}
        changeMarkerStatus={this.changeMarkerStatus}
      />
    );
  }
}

export default Map;
