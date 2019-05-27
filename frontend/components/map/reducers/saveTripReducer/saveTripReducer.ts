import {useReducer} from "react";
import mapImageUrlGenerator from "./lib/helpers/mapImageUrlGenerator";
import {GoogleLinkImageProps} from "./lib/interfaces";

interface Action {
  type: string;
  [key: string]: any;
  step: number;
  urlProps: GoogleLinkImageProps;
  tripPosition: {
    lat: number;
    lng: number;
  };
}

interface State {
  step: number;
  isScreenOn: boolean;
  googleImageUrl: string;
  tripPosition: {
    lat: number;
    lng: number;
  };
}

const initialState = {
  step: -1,
  saveImageModeOn: false,
  googleImageUrl: "",
  tripPosition: {
    lat: 31,
    lng: -83,
  },
};
const saveTripReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_STEP": {
      return {
        ...state,
        step: action.step,
      };
    }
    case "SET_IMAGE_MODE": {
      return {
        ...state,
        saveImageModeOn: action.saveImageModeOn,
      };
    }
    case "SAVE_TRIP_POSITION": {
      return {
        ...state,
        tripPosition: action.tripPosition,
      };
    }
    case "SAVE_TRIP_IMAGE": {
      return {
        ...state,
        googleImageUrl: mapImageUrlGenerator(action.urlProps),
      };
    }
    default: {
      throw Error(
        `saveTripReducer got an unknown action. Error: ${JSON.stringify(
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
  saveTripReducer,
  initialState,
);
