import {QueryMarker} from "./../../interfaces/query-marker.interface";
import {useReducer} from "react";
import {Marker} from "../../interfaces";
import {
  addMarker,
  updateMarker,
  findMarkerIndex,
  setupMarkersFromDB,
} from "./lib/helpers/index";

interface State {
  markers: Marker[];
}

interface Action {
  type: string;
  [key: string]: any;
  markers: Marker[] | QueryMarker[];
  marker: Marker;
  props: object;
}

const initialState = {
  activeMarker: {},
  markers: [],
};
const markerReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "ADD_MARKER": {
      return {
        ...state,
        markers: [
          ...state.markers,
          addMarker(action.event, state.markers.length),
        ],
      };
    }
    case "DELETE_MARKER": {
      const index = findMarkerIndex(state.markers, action.marker);
      return {
        ...state,
        markers: [
          ...state.markers.slice(0, index),
          ...state.markers.slice(index + 1),
        ],
      };
    }
    case "UPDATE_MARKER": {
      const {updatedMarker, updatedIndex} = updateMarker(
        state.markers,
        action.marker,
        action.props,
      );
      return {
        ...state,
        activeMarker: updatedMarker,
        markers: [
          ...state.markers.slice(0, updatedIndex),
          updatedMarker,
          ...state.markers.slice(updatedIndex + 1),
        ],
      };
    }
    case "SET_ACTIVE_MARKER": {
      return {
        ...state,
        activeMarker: action.marker,
      };
    }
    case "SET_MARKERS_FROM_DATABASE": {
      return {
        ...state,
        markers: setupMarkersFromDB(action.markers),
      };
    }
    default: {
      throw Error(
        `markerReducer got an unknown action. Error: ${JSON.stringify(
          action,
          undefined,
        )}`,
      );
    }
  }
};

export default useReducer.bind(
  //@ts-ignore
  this,
  markerReducer,
  initialState,
);
