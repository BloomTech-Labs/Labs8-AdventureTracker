import {Marker} from "../../map/interfaces";

const changeMarkersForUpsert = (markers: Marker[]) => {
  return markers.map(marker => {
    const {id, hasReached, label} = marker;
    const {lat, lng} = marker.position;
    return {
      where: {
        id,
      },
      update: {
        hasReached,
        label,
        lng,
        lat,
      },
      create: {
        hasReached,
        label,
        lng,
        lat,
      },
    };
  });
};

export {changeMarkersForUpsert};
