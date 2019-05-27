import * as uuidv4 from "uuid/v4";
import {Marker, MapEvent} from "../../../../interfaces";
import {labels, labelStyle} from "../../../../lib/index";
import {GREY_PIN} from "../../../../map-icons/markerIcons";
import * as moment from "moment";

export default (e: MapEvent, numOfMarkers: number) => {
  const lat: number = e.latLng.lat();
  const lng: number = e.latLng.lng();
  const newMarker: Marker = {
    draggable: true,
    label: labels[numOfMarkers % labels.length].toUpperCase(),
    url: GREY_PIN,
    date: moment(),
    address: "",
    labelStyle,
    id: uuidv4(),
    position: {
      lat,
      lng,
    },
    hasReached: false,
  };
  return newMarker;
};
