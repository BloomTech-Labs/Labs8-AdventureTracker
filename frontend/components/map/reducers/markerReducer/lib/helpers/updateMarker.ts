import {Marker} from "../../../../interfaces";

export default (markers: Marker[], marker: Marker, props: object) => {
  const oldIndex = markers.findIndex((mark: Marker) => {
    return mark.id === marker.id;
  });
  const updatedMarker = {
    ...markers[oldIndex],
    ...props,
  };
  return {
    updatedMarker,
    updatedIndex: oldIndex,
  };
};
