import {useReducer} from "react";
import {Marker} from "../../interfaces";
import addMarker from "./lib/helpers/addMarker";
import updateMarker from "./lib/helpers/updateMarker";

interface State {
  markers: Marker[];
}

interface Action {
  type: string;
  [key: string]: any;
  markers: Marker[];
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
      return {
        ...state,
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
          ...state.markers.slice(updatedIndex),
        ],
      };
    }
    case "SET_ACTIVE_MARKER": {
      return {
        ...state,
        activeMarker: action.marker,
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
