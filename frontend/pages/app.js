import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import CurrentLocation from './map';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  // Shows local areas of interest based on current location
  fetchPlaces(mapProps, map) {
    const { google } = mapProps;
    const services = new google.maps.places.PlacesService(map);
  }

  renderMarkers(map, maps) {
    let marker = new maps.Marker({
      position: myLang,
      map,
      title: 'Hello World!'
    });
  }

  render() {
    return (
      <Map google={this.props.google} zoom={14} onReady={this.fetchPlaces} visible={false}>
        <Listing places={this.state.places} />
        <Marker onClick={this.onMarkerClick} name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDYNQBttgqum1eAf8O90Ho7nm5b8mzfmMI'
})(MapContainer);
