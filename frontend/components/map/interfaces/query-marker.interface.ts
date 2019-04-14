import {Moment} from "moment";

export interface QueryMarker {
  hasReached: boolean;
  label: string;
  lat: number;
  lng: number;
  date: Moment;
  id: string;
}
