import {QueryMarker} from "./../../../../interfaces/query-marker.interface";
import {Marker} from "./../../../../interfaces/marker.interface";
import {
  GREY_PIN,
  CHECKED_PIN,
  YELLOW_EXCLAMATION_PIN,
  RED_EXCLAMATION_PIN,
} from "../../../../map-icons/markerIcons";
import * as moment from "moment";

export default (marker: Marker | QueryMarker) => {
  let url = GREY_PIN;
  if (marker.hasReached) {
    url = CHECKED_PIN;
  } else {
    const now = moment();
    const markerTime = moment(marker.date);

    const minutesDiff = markerTime.diff(now, "minutes");
    if (minutesDiff >= 0) {
      return url;
    } else if (minutesDiff > -59 && minutesDiff < 0) {
      url = YELLOW_EXCLAMATION_PIN;
    } else {
      url = RED_EXCLAMATION_PIN;
    }
  }
  return url;
};
