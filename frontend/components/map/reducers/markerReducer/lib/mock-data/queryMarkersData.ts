import {QueryMarker} from "./../../../../interfaces/query-marker.interface";
import * as moment from "moment";

export {queryMarkers};
const queryMarkers: QueryMarker[] = [
  {
    hasReached: true,
    label: "A",
    lat: 11,
    lng: 11,
    date: moment(),
    id: "a",
  },
  {
    hasReached: false,
    label: "B",
    lat: 22,
    lng: 22,
    date: moment(),
    id: "b",
  },
  {
    hasReached: false,
    label: "C",
    lat: 33,
    lng: 33,
    date: moment(),
    id: "c",
  },
];
