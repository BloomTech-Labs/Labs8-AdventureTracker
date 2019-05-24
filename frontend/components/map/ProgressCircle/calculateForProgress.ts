import {Marker} from "./../interfaces/marker.interface";
export default (markers: Marker[]) => {
  let countMarkersReached: number = 0;
  for (let i = 0; i < markers.length; i++) {
    if (markers[i].hasReached) {
      countMarkersReached++;
    }
  }
  return {
    getPercentProgress: Math.floor(
      (countMarkersReached / markers.length) * 100,
    ),
    getMarkersReached: countMarkersReached,
  };
};
