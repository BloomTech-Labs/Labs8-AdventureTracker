import {useReducer} from "react";
import {Marker} from "../../interfaces";
import addMarker from "./lib/helpers/addMarker";

interface State {
  markers: Marker[];
}

interface Action {
  type: string;
  [key: string]: any;
  markers: Marker[];
  marker: Marker;
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
          addMarker(action.event, state.markers),
        ],
      };
    }
    case "DELETE_MARKER": {
      return {
        ...state,
      };
    }
    case "UPDATE_MARKER": {
      return {
        ...state,
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
