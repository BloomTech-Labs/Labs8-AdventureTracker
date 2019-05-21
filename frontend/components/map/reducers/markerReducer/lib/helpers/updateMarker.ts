import {Marker} from "../../../../interfaces";

export default (markers: Marker[], marker: Marker, props: object) => {
  const oldIndex = markers.findIndex((mark: Marker) => {
    return mark.id === marker.id;
  });
  const updatedMarker = {
    ...markers[oldIndex],
    ...props,
  };
  return [
    ...markers.slice(0, oldIndex),
    updatedMarker,
    ...markers.slice(oldIndex + 1),
  ];
};
