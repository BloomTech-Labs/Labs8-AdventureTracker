import React from 'react';

//react-google-maps docs: https://tomchentw.github.io/react-google-maps/
import uuidv4 from 'uuid/v4';
import {
  GREY_PIN,
  CHECKMARK_ICON,
  ORANGE_EXCLAMATION,
  RED_EXCLAMATION
} from './map-components/styles/MapIcons';
import moment from 'moment';
import { MapComponent } from './MapComponent';

class MapContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tripTitle: '',
      startDate: new Date(),
      endDate: new Date(),
      etaTime: new Date(),
      showingInfoWindow: false,
      // Storing location state for centering the map based on the marker
      location: { lat: 38.9260256843898, lng: -104.755169921875 },
      clickLocation: {},
      activeMarker: {},
      selectedPlace: {},
      markers: [],
      checkpointName: '',
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
  //Keep all lifecycle methods above the rest of the methods
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
  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  clearActiveMarker = () => {
    this.setState({ activeMarker: {} });
  };
  calculateTime = (plusMinute = 0, plusHour = 0) => {
    const date = new Date();
    return `${date.getHours() + plusHour}:${
      date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
    }`;
  };
  //Calculates the label for the marker
  calculateLabel = letterIndex => {
    return this.labels[letterIndex % this.labels.length];
  };
  setMarkerColorsByDate = () => {
    const { markers } = this.state;
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

  deleteMarker = markerId => {
    const { markers } = this.state;
    let deleteIndex;
    for (let i = 0; i < markers.length; i++) {
      if (markerId === markers[i].id) {
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
    const { showingInfoWindow } = this.state;

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
  onMarkerClicked = (e, marker) => {
    this.clearMarkerInfo();
    // console.log(marker);
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true,
      ...marker,
      location: marker.position
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
    const newText = checkpointName !== '' ? checkpointName : this.calculateLabel(markerIndex);
    // console.log('Update marker INFO: ', updateMutation.data.updateMarker);
    const editedMarker = {
      ...markers[markerIndex],
      ...updateMutation.data.updateMarker
    };
    editedMarker.label = {
      ...editedMarker.label,
      text: newText
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

    return (
      <MapComponent
        //state object props to send down
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

export { MapContainer };
