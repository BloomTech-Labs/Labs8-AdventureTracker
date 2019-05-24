import updateMarker from "../updateMarker";
import {markers} from "../../mock-data/markersData";
describe("testing updateMarker function", () => {
  it("should update the selected props ", () => {
    let activeMarker = markers[0];
    expect(activeMarker).toMatchObject({
      hasReached: false,
      label: "A",
    });
    const {updatedMarker, updatedIndex} = updateMarker(
      markers,
      activeMarker,
      {
        hasReached: true,
        label: "Test",
      },
    );

    expect(updatedIndex).toBe(0);
    expect(updatedMarker).toMatchObject({
      hasReached: true,
      label: "Test",
    });
  });
});
