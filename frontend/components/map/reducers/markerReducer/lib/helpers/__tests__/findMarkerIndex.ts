import findMarkerIndex from "../findMarkerIndex";
import {markers} from "../../mock-data/markersData";
describe("testing findMarkerIndex function", () => {
  it("should find the marker index", () => {
    let marker = markers[1];
    let index = findMarkerIndex(markers, marker);
    expect(index).toBe(1);

    marker = markers[2];
    index = findMarkerIndex(markers, marker);
    expect(index).toBe(2);
  });
});
