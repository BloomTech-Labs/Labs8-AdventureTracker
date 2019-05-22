import {useContext} from "react";
import {Checkbox, Modal} from "antd";
import {Marker} from "../interfaces/marker.interface";
import MapContext from "../../context/MapContext";
import {GREY_PIN, CHECKED_PIN} from "../map-icons/markerIcons";
const confirm = Modal.confirm;
const ReachedCheckbox = () => {
  const {markState, markDispatch} = useContext(MapContext);
  const {activeMarker, markers} = markState;
  return (
    <Checkbox
      onChange={(e: any) => {
        const activeIndex = markers.findIndex((mark: Marker) => {
          return mark.id === activeMarker.id;
        });

        if (
          markers[activeIndex - 1] &&
          markers[activeIndex - 1].hasReached === false &&
          activeMarker.hasReached === false
        ) {
          confirm({
            title: "Are you sure you reached this point?",
            content: "Previous markers will be confirmed as reached.",
            onOk() {
              for (let i = 0; i <= activeIndex; i++) {
                markDispatch({
                  type: "UPDATE_MARKER",
                  marker: markers[i],
                  props: {
                    hasReached: true,
                    url: CHECKED_PIN,
                  },
                });
              }
            },
          });
        } else if (
          activeMarker.hasReached &&
          markers[activeIndex + 1].hasReached
        ) {
          confirm({
            title: "Are you sure you want to backtrack to this marker?",
            content:
              "Markers ahead of the current marker will be confirmed as not reached.",
            onOk() {
              for (let i = markers.length - 1; i >= activeIndex; i--) {
                markDispatch({
                  type: "UPDATE_MARKER",
                  marker: markers[i],
                  props: {
                    hasReached: false,
                    url: GREY_PIN,
                  },
                });
              }
            },
          });
        } else {
          markDispatch({
            type: "UPDATE_MARKER",
            marker: activeMarker,
            props: {
              hasReached: e.target.checked,
              url: e.target.checked ? CHECKED_PIN : GREY_PIN,
            },
          });
        }
      }}
      checked={activeMarker.hasReached}
    >
      Reached Destination?
    </Checkbox>
  );
};

export default ReachedCheckbox;
