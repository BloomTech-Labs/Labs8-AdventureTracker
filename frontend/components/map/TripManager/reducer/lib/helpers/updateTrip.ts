import {Trip} from "../../../../interfaces";

export default (trips: Trip[], tripIdToChange: String, props: object) => {
  const foundIndex = trips.findIndex((trip: Trip) => {
    return trip.id === tripIdToChange;
  });

  const updatedTrip = {
    ...trips[foundIndex],
    ...props,
  };
  return [
    ...trips.slice(0, foundIndex),
    updatedTrip,
    ...trips.slice(foundIndex + 1),
  ];
};
