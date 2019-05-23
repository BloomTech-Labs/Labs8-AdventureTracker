import {Marker} from "../../../../interfaces";

export default (markers: Marker[], marker: Marker) => {
  return markers.findIndex((mark: Marker) => {
    return mark.id === marker.id;
  });
};
