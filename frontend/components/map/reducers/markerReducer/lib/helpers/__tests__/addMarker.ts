import addMarker from "../addMarker";
import {GREY_PIN} from "../../../../../map-icons/markerIcons";

describe("testing addMarker function", () => {
  it("adds a marker with the required properties", () => {
    const e = {
      latLng: {
        lat: () => 33.4,
        lng: () => 22,
      },
    };
    //@ts-ignore
    const marker = addMarker(e, 1);
    expect(marker).toMatchObject({
      hasReached: false,
      label: "B",
      position: {
        lat: 33.4,
        lng: 22,
      },
      address: "",
      url: GREY_PIN,
    });
  });
});
