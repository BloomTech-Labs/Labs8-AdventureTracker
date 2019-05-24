import calculateForProgress from "../calculateForProgress";
import {markers} from "../../lib/mock-data/markers";
describe("testing caclualteForProgress function", () => {
  it("should get a rounded percentage and find how many markers have been reached", () => {
    const mockMarkers = markers.slice();

    expect(calculateForProgress(mockMarkers)).toMatchObject({
      getPercentProgress: 75,
      getMarkersReached: 3,
    });
    mockMarkers[3].hasReached = true;
    expect(calculateForProgress(mockMarkers)).toMatchObject({
      getMarkersReached: 4,
      getPercentProgress: 100,
    });
  });
});
