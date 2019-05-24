import setupMarkersFromDB from "../setupMarkersFromDB";
import {queryMarkers} from "../../mock-data/queryMarkersData";
import {CHECKED_PIN, GREY_PIN} from "../../../../../map-icons/markerIcons";

describe("testing setup MarkersFromDB function", () => {
  it("should setup markers from DB to be used on the map", () => {
    const markers = queryMarkers.slice();

    const setupMarkers = setupMarkersFromDB(markers);
    expect(setupMarkers[0]).toMatchObject({
      label: "A",
      url: CHECKED_PIN,
      address: "",
      position: {
        lat: 11,
        lng: 11,
      },
      hasReached: true,
    });
    expect(setupMarkers[1]).toMatchObject({
      label: "B",
      url: GREY_PIN,
      address: "",
      position: {
        lat: 22,
        lng: 22,
      },
      hasReached: false,
    });
    expect(setupMarkers[2]).toMatchObject({
      label: "C",
      url: GREY_PIN,
      address: "",
      position: {
        lat: 33,
        lng: 33,
      },
      hasReached: false,
    });
  });
});
