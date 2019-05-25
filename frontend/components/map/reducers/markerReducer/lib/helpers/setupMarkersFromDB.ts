import {QueryMarker} from "../../../../interfaces/query-marker.interface";
import decideMarkerURL from "./decideMarkerURL";
import {labelStyle} from "../../../../lib/index";
import * as moment from "moment";
export default (markers: QueryMarker[]) => {
  const updatedMarkers = [];
  for (let i = 0; i < markers.length; i++) {
    const marker = markers[i];
    const {hasReached, label, lat, lng, id, date} = marker;
    updatedMarkers.push({
      hasReached,
      url: decideMarkerURL(marker),
      label,
      address: "",
      draggable: true,
      labelStyle,
      id,
      date: moment(date),
      position: {
        lat,
        lng,
      },
    });
  }
  return updatedMarkers;
};
