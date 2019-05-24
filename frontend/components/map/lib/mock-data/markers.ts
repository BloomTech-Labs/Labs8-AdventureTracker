import {Marker} from "./../../../../interfaces/marker.interface";
import {GREY_PIN} from "../../../../map-icons/markerIcons";
import * as moment from "moment";

export {markers};
const markers: Marker[] = [
  {
    draggable: true,
    label: "A",
    id: "a1",
    position: {
      lat: 11,
      lng: 11,
    },
    hasReached: true,
    url: GREY_PIN,
    address: "",
    labelStyle: {},
    date: moment(),
  },
  {
    draggable: true,
    label: "B",
    id: "b2",
    position: {
      lat: 22,
      lng: 22,
    },
    hasReached: true,
    url: GREY_PIN,
    address: "",
    labelStyle: {},
    date: moment(),
  },
  {
    draggable: true,
    label: "C",
    id: "c3",
    position: {
      lat: 33,
      lng: 33,
    },
    hasReached: true,
    url: GREY_PIN,
    address: "",
    labelStyle: {},
    date: moment(),
  },
  {
    draggable: true,
    label: "D",
    id: "d4",
    position: {
      lat: 44,
      lng: 44,
    },
    hasReached: false,
    url: GREY_PIN,
    address: "",
    labelStyle: {},
    date: moment(),
  },
];
