import {calculateForProgress} from "../calculateForProgress";
import {markers} from "../../lib/mock-data/markers"
describe("testing caclualteForProgress function", () => {
  it("should get a rounded percentage and find how many markers have been reached", () => {
      const mockMarkers = markers.slice();

      expect(calculateForProgress(mockMarkers)).toMatchObject({
        getPercentProgress: 66
        getMarkersReached: 3
      })
  }
});
