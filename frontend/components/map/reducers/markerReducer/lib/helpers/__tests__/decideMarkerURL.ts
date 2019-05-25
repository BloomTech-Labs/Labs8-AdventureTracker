import decideMarkerURL from "../decideMarkerURL";
import {markers} from "../../mock-data/markersData";
import {
  GREY_PIN,
  RED_EXCLAMATION_PIN,
  CHECKED_PIN,
  YELLOW_EXCLAMATION_PIN,
} from "../../../../../map-icons/markerIcons";
import * as moment from "moment";

describe("testing decideMarkerURL function", () => {
  it("should decide the proper marker by date and time", () => {
    const mockMarkers = markers.slice();
    let activeMarker = mockMarkers[0];

    expect(decideMarkerURL(activeMarker)).toBe(GREY_PIN);

    activeMarker.date = moment().minutes(5);
    expect(decideMarkerURL(activeMarker)).toBe(YELLOW_EXCLAMATION_PIN);

    activeMarker.date = moment("2014-06-01T12:00:00Z");
    expect(decideMarkerURL(activeMarker)).toBe(RED_EXCLAMATION_PIN);
  });
  it("if the marker has been reached, it should have a checkmark pin", () => {
    const mockMarkers = markers.slice();
    const activeMarker = mockMarkers[0];
    activeMarker.hasReached = true;
    expect(decideMarkerURL(activeMarker)).toBe(CHECKED_PIN);
  });
  it("if the hasReached property is true, it should not change marker's pin by date even if past the ETA time", () => {
    const mockMarkers = markers.slice();
    const activeMarker = mockMarkers[0];
    activeMarker.hasReached = true;
    expect(decideMarkerURL(activeMarker)).toBe(CHECKED_PIN);

    activeMarker.date = moment("2014-06-01T12:00:00Z");
    expect(decideMarkerURL(activeMarker)).toBe(CHECKED_PIN);
  });
});
