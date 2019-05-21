import uuidv4 from "uuid";
import {Marker, MapEvent} from "../../../../interfaces";
import {labels, labelStyle} from "../../../../lib/index";
import {GREY_PIN} from "../../../../map-icons/markerIcons";
import moment from "moment";

export default (e: MapEvent, markers: Marker[]) => {
  const lat: number = e.latLng.lat();
  const lng: number = e.latLng.lng();
  const newMarker: Marker = {
    draggable: true,
    label: labels[markers.length % labels.length].toUpperCase(),
    url: GREY_PIN,
    date: moment(),
    address: "",
    //@ts-ignore
    labelStyle,
    id: uuidv4(),
    position: {
      lat,
      lng,
    },
    hasReached: false,
  };
  //@ts-ignore
  return newMarker;
};
