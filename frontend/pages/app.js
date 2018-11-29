import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polygon, Polyline } from 'google-maps-react';

import CurrentLocation from './map';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    markers: []
  };

  mapClicked = (mapProps, map, clickEvent) => {
    console.log(clickEvent.xa);
    const myLatLng = {
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng()
    };
    const { markers } = this.state;
    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const amountOfMarkers = markers.length;
    const marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      id: amountOfMarkers,
      title: amountOfMarkers,
      label: labels[amountOfMarkers % labels.length]
    });
    markers.push(marker);
    console.log(markers);

    const InfoWindow = new google.maps.InfoWindow({
      content: myLatLng
    });
    marker.addListener('click', function() {
      InfoWindow.open(map, marker);
    });
  };

  render() {
    const { markers } = this.state;
    return (
      <Map
        google={this.props.google}
        onClick={this.mapClicked}
        style={{ width: '100%', height: '100%', position: 'relative' }}
        className={'map'}
        zoom={4}
      >
        {markers.map(mark => {
          return (
            <Marker
              title={mark.title}
              id={mark.id}
              position={{ lat: mark.position.lat, lng: mark.position.lng }}
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
