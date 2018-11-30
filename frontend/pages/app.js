import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polygon, Polyline } from 'google-maps-react';
import ReactDOM from 'react-dom';
import CurrentLocation from './map';
import uuidv1 from 'uuid/v1';
export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      clickedMarker: {},
      selectedPlace: {},
      markers: [],
      polylines: []
    };
    this.NOT_STARTED = 'NOT_STARTED';
    this.IN_PROGRESS = 'IN_PROGRESS';
    this.COMPLETED = 'COMPLETED';
    this.labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  //distance in miles
  //distance matrix
  //create the ETA
  updateLines = () => {
    // thin grey is not reached yet and the person has not started that path
    const greyLine = {
      strokeWeight: 5,
      strokeColor: '#969696'
    };
    // a dashed line is in-progress, the person has started on that path
    // Doc for dashed-line: https://developers.google.com/maps/documentation/javascript/examples/overlay-symbol-dashed
    const lineSymbol = {
      path: 'M 0,-1 0,1',
      strokeOpacity: 1,
      scale: 4
    };
    const dashedLine = {
      strokeWeight: 5,
      strokeColor: 'green'
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
      //Depending on marker's status, this will choose what type of line to use
      if (markers[i].status === this.NOT_STARTED) {
        lineOptions = {
          ...greyLine
        };
      } else if (markers[i].status === this.IN_PROGRESS) {
        lineOptions = {
          ...dashedLine
        };
      } else if (markers[i].status === this.COMPLETED) {
        lineOptions = {
          ...solidBlackLine
        };
      }
      //set the lat and lng dot
      line.push({ lat: markerLat, lng: markerLng });

      //Every two markers set consecutively, add a new polyline
      if (i > 0) {
        lineOptions['path'] = line.slice();
        lines.push(lineOptions);
        //Reset for new line
        line = [{ lat: markerLat, lng: markerLng }];
      }
    }
    console.log(lines);
    this.setState({ polylines: lines });
  };
  mapClicked = (mapProps, map, clickEvent) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
    const myLatLng = {
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng()
    };
    const { markers, polylines } = this.state;
    console.log('POLYLINES: ', polylines);
    const amountOfMarkers = markers.length;

    const marker = {
      position: myLatLng,
      map: map,
      id: uuidv1(),
      title: String(amountOfMarkers),
      label: this.labels[amountOfMarkers % this.labels.length],
      //NOT_STARTED, IN_PROGRESS, COMPLETED - NOT_STARTED is default
      status: this.NOT_STARTED
    };
    console.log(marker.id);
    this.setState({ markers: [...markers, marker] }, () => this.updateLines());

    // Line coords takes an array of arrays which specifies where the dots are
    // Need to use the marker coordinates in order to make those lines
    // Somehow specify what type of line it is
  };
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      clickedMarker: { lat: props.position.lat, lng: props.position.lng }
    });
  };
  checkInAtMarker = () => {
    console.log('Completed!');
  };

  deleteMarker = () => {
    const { markers, activeMarker } = this.state;

    if (markers.length <= 1) {
      this.setState({ markers: [] });
      return;
    }
    let deleteIndex;
    for (let i = 0; i < markers.length; i++) {
      if (activeMarker.id === markers[i].id) {
        deleteIndex = i;
      }
    }
    const newMarkerSet = [...markers.slice(0, deleteIndex), ...markers.slice(deleteIndex + 1)];
    for (let i = 0; i < newMarkerSet.length; i++) {
      newMarkerSet[i].label = this.labels[i % this.labels.length];
    }
    this.setState({ markers: [] }, () => {
      this.setState({ markers: newMarkerSet }, () => {
        this.updateLines();
      });
    });
  };

  onInfoWindowOpen = e => {
    const infoWindowComponents = (
      <div>
        <label id="reached-checkpoint">Reached Checkpoint?</label>
        <input
          type="checkbox"
          id="reached-checkpoint"
          onClick={e => {
            this.checkInAtMarker();
          }}
        />
        <input
          type="button"
          onClick={e => {
            this.deleteMarker();
          }}
          value="Delete Checkpoint?"
        />
      </div>
    );
    ReactDOM.render(infoWindowComponents, document.getElementById('iwc'));
  };

  render() {
    const { markers, polylines, clickedMarker } = this.state;
    return (
      <Map
        google={this.props.google}
        onClick={this.mapClicked}
        style={{ width: '100%', height: '100%', position: 'relative' }}
        className={'map'}
        zoom={4}
      >
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onOpen={e => {
            this.onInfoWindowOpen(e);
          }}
        >
          <div>
            {/* <div>Latitude: {clickedMarker.lat}</div> */}
            <div id="iwc" />
            {/* <div>Longitude: {clickedMarker.lng}</div> */}
          </div>
        </InfoWindow>
        {markers.map(mark => {
          // console.log(mark.label);
          return (
            <Marker
              onClick={this.onMarkerClick}
              title={mark.title}
              id={mark.id}
              key={mark.id}
              label={mark.label}
              status={mark.status}
              position={mark.position}
            />
          );
        })}

        {polylines.map((line, i) => {
          return (
            <Polygon
              key={i}
              paths={line.path}
              strokeColor={line.strokeColor}
              strokeWeight={line.strokeWeight}
              strokeOpacity={line.strokeOpacity}
            />
          );
        })}
        {/* <Marker
          title={'The marker`s title will appear as a tooltip.'}
          name={'SOMA'}
          position={{ lat: 37.778519, lng: -122.40564 }}
        />
        <Marker name={'Dolores park'} position={{ lat: 37.759703, lng: -122.428093 }} />
        <Marker />
        <Marker
          name={'Your position'}
          position={{ lat: 37.762391, lng: -122.439192 }}
          icon={{
            url: '/path/to/custom_icon.png',
            anchor: new google.maps.Point(32, 32),
            scaledSize: new google.maps.Size(64, 64)
          }}
        /> */}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDYNQBttgqum1eAf8O90Ho7nm5b8mzfmMI'
})(MapContainer);
