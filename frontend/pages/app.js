import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polygon, Polyline } from 'google-maps-react';

import CurrentLocation from './map';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  mapClicked = (mapProps, map, clickEvent) => {
    console.log('You clicked the map!');
  };

  render() {
    const triangleCoords = [
      { lat: 25.774, lng: -80.19 },
      { lat: 18.466, lng: -66.118 },
      { lat: 32.321, lng: -64.757 },
      { lat: 25.774, lng: -80.19 }
    ];
    return (
      <Map
        google={this.props.google}
        onClick={this.mapClicked}
        style={{ width: '100%', height: '100%', position: 'relative' }}
        className={'map'}
        zoom={4}
      >
        <Marker
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
        />
        <Polygon
          paths={triangleCoords}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#0000FF"
          fillOpacity={0.35}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDYNQBttgqum1eAf8O90Ho7nm5b8mzfmMI'
})(MapContainer);
