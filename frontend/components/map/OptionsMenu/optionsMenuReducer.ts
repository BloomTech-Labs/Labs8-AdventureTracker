import {useReducer} from "react";

interface Action {
  type: string;
  [key: string]: any;
}

const initialState = {
  isUpdating: false,
  hasError: false,
};
const optionsMenuReducer = (state: object, action: Action) => {
  switch (action.type) {
    case "UPDATING_TRIP": {
      return {
        ...state,
        hasError: false,
        isUpdating: true,
      };
    }
    case "UPDATED_TRIP": {
      return {
        ...state,
        hasError: false,
        isUpdating: false,
      };
    }
    case "UPDATE_TRIP_ERROR": {
      return {
        ...state,
        isUpdating: false,
        hasError: true,
      };
    }
    default: {
      throw Error(
        `optionsMenuReducer got an unknown action. Error: ${JSON.stringify(
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
  optionsMenuReducer,
  initialState,
);
