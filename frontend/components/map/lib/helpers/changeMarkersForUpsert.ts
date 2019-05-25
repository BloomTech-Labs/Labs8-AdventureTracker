import {Marker} from "./../../interfaces/marker.interface";

const changeMarkersForUpsert = (markers: Marker[]) => {
  return markers.map(marker => {
    const {id, hasReached, label, date} = marker;
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
        date,
      },
      create: {
        hasReached,
        label,
        lng,
        lat,
        date,
      },
    };
  });
};

export {changeMarkersForUpsert};
