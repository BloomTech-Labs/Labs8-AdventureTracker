import {Marker, MapEvent} from "../interfaces/index";
import {useState} from "react";
import uuidv4 from "uuid/v4";
import {letters} from "../lib/labels";
import {
  GREY_PIN,
  CHECKED_PIN,
  YELLOW_EXCLAMATION_PIN,
  RED_EXCLAMATION_PIN,
} from "../map-icons/markerIcons";
import moment, {Moment} from "moment";
export default () => {
  const [markers, setMarkers] = useState([]);
  const [markerId, setMarkerId] = useState("");
  const [activeMarker, setActiveMarker] = useState({});

  const addMarker = (e: MapEvent) => {
    const lat: number = e.latLng.lat();
    const lng: number = e.latLng.lng();
    const newMarker: Marker = {
      draggable: true,
      label: letters[markers.length % letters.length].toUpperCase(),
      url: GREY_PIN,
      date: moment(),
      //@ts-ignore
      labelStyle: {
        backgroundColor: "#131313",
        textAlign: "center",
        opacity: ".8",
        fontSize: "12px",
        fontFamily: "monospace",
        padding: "3px 6px",
        color: "#E4E4E4",
        borderRadius: "5px",
        textOverflow: "eclipse",
        pointerEvents: "none",
      },
      id: uuidv4(),
      position: {
        lat,
        lng,
      },
      hasReached: false,
    };
    //@ts-ignore
    setMarkers([...markers, newMarker]);
  };

  const deleteMarker = (id: string) => {
    const deleteIndex = markers.findIndex((mark: Marker) => {
      return mark.id === id;
    });
    setMarkers([
      ...markers.slice(0, deleteIndex),
      ...markers.slice(deleteIndex + 1),
    ]);
  };

  const clearMarkerId = () => setMarkerId("");

  const updateMarkerPosition = (id: string, e: MapEvent) => {
    const updateIndex = markers.findIndex((mark: Marker) => {
      return id === mark.id;
    });

    const lat: number = e.latLng.lat();
    const lng: number = e.latLng.lng();
    const currMarker: Marker = markers[updateIndex];
    const updatedMarker: Marker = {
      ...currMarker,
      position: {
        lat,
        lng,
      },
    };
    //@ts-ignore
    setMarkers([
      ...markers.slice(0, updateIndex),
      updatedMarker,
      ...markers.slice(updateIndex + 1),
    ]);
  };

  const updateAllMarkerLabels = (id: string) => {
    const startUpdateIndex =
      markers.findIndex((mark: Marker) => {
        return mark.id === id;
      }) + 1;
    const affectedMarkers = [];
    for (let i = startUpdateIndex; i < markers.length; i++) {
      const marker: Marker = markers[i];
      let updatedMarker = {
        ...marker,
        label: letters[(i - 1) % letters.length].toUpperCase(),
      };
      affectedMarkers.push(updatedMarker);
    }
    //@ts-ignore
    setMarkers([
      ...markers.slice(0, startUpdateIndex - 1),
      ...affectedMarkers,
    ]);
  };
  const toggleMarkerReached = (
    id: string,
    prevConfirmModalCb: Function,
    nextConfirmModalCb: Function,
  ) => {
    const updateIndex = markers.findIndex((mark: Marker) => {
      return mark.id === id;
    });
    const prevMarker: Marker = markers[updateIndex - 1];
    const nextMarker: Marker = markers[updateIndex + 1];
    if (prevMarker !== undefined && prevMarker.hasReached === false) {
      if (prevConfirmModalCb) {
        const firstNotReachedIndex = markers.findIndex((mark: Marker) => {
          return mark.hasReached === false;
        });
        prevConfirmModalCb([firstNotReachedIndex, updateIndex]);
      }
      return;
    }
    if (nextMarker !== undefined && nextMarker.hasReached === true) {
      if (nextConfirmModalCb) {
        nextConfirmModalCb([updateIndex, markers.length - 1]);
      }
      return;
    }
    const markerToUpdate: Marker = markers[updateIndex];
    const updatedMarker: Marker = {
      ...markerToUpdate,
      hasReached: !markerToUpdate.hasReached,
    };

    updatedMarker.url = decideMarkerURL(updatedMarker);

    //@ts-ignore
    setMarkers([
      ...markers.slice(0, updateIndex),
      updatedMarker,
      ...markers.slice(updateIndex + 1),
    ]);
    setActiveMarker(updatedMarker);
  };

  const clearActiveMarker = () => {
    setActiveMarker({});
  };
  const updateMarkerLabelName = (marker: Marker, newLabel: string) => {
    const updateIndex = markers.findIndex(
      (mark: Marker) => mark.id === marker.id,
    );
    const updatedMarker = {
      ...marker,
      label: newLabel,
    };
    //@ts-ignore
    setMarkers([
      ...markers.slice(0, updateIndex),
      updatedMarker,
      ...markers.slice(updateIndex + 1),
    ]);
    setActiveMarker(updatedMarker);
  };
  const setMarkerDate = (marker: Marker, date: Moment) => {
    const updatedMarker = {
      ...marker,
      date: date,
    };
    updatedMarker.url = decideMarkerURL(updatedMarker);
    setActiveMarker(updatedMarker);
    const updateIndex = markers.findIndex(
      (mark: Marker) => mark.id === marker.id,
    );
    //@ts-ignore
    setMarkers([
      ...markers.slice(0, updateIndex),
      updatedMarker,
      ...markers.slice(updateIndex + 1),
    ]);
  };
  const decideMarkerURL = (marker: Marker) => {
    let url = GREY_PIN;
    if (marker.hasReached) {
      url = CHECKED_PIN;
    } else {
      const now = moment();
      const markerTime = moment(marker.date);

      const minutesDiff = markerTime.diff(now, "minutes");
      if (minutesDiff >= 0) {
        return url;
      } else if (minutesDiff > -59 && minutesDiff < 0) {
        url = YELLOW_EXCLAMATION_PIN;
      } else {
        url = RED_EXCLAMATION_PIN;
      }
    }
    return url;
  };
  return {
    //methods
    addMarker,
    deleteMarker,
    updateMarkerPosition,
    setMarkerId,
    clearMarkerId,
    updateAllMarkerLabels,
    setActiveMarker,
    clearActiveMarker,
    toggleMarkerReached,
    setMarkers,
    updateMarkerLabelName,
    setMarkerDate,
    decideMarkerURL,
    //state
    markers,
    activeMarker,
    markerId,
  };
};
