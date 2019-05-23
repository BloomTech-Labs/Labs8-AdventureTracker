import {useReducer} from "react";
import mapImageUrlGenerator from "./lib/helpers/mapImageUrlGenerator";

interface Action {
  type: string;
  [key: string]: any;
  step: number;
  urlProps: {
    [key: string]: any;
  };
}

interface State {
  step: number;
  isScreenOn: boolean;
  googleImageUrl: string;
}

const initialState = {
  step: -1,
  saveImageModeOn: false,
  googleImageUrl: "",
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
    case "WHILE_IMAGE_MODE_ON": {
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
