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
  deletedMarkersIdsFromDB: {
    id: String;
  }[];
}

interface Action {
  type: string;
  [key: string]: any;
  markers: Marker[];
  queryMarkers: QueryMarker[];
  deletedMarkerId: {
    id: String;
  };
  marker: Marker;
  props: object;
}

const initialState = {
  activeMarker: {},
  markers: [],
  deletedMarkersIdsFromDB: [],
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

      // Ids from database are different from markers not saved to the database.
      // Have to store ids from database to update trip.
      const deletedIds = [...state.deletedMarkersIdsFromDB];
      if (!state.markers[index].id.match(/(\w+-){4}\w+/)) {
        deletedIds.push({id: state.markers[index].id});
      }
      return {
        ...state,
        deletedMarkersIdsFromDB: deletedIds,
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
        markers: setupMarkersFromDB(action.queryMarkers),
      };
    }
    case "EMPTY_DELETED_DB_MARKERS_IDS": {
      return {
        ...state,
        deletedMarkersIdsFromDB: [],
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
