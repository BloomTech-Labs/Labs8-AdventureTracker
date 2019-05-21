import {useReducer} from "react";
import {Marker} from "../../interfaces";
import {updateLines} from "./helpers";

interface Action {
  type: string;
  [key: string]: any;
  lines: Marker[];
}

const initialState = {
  lines: [],
};
const lineReducer = (state: object, action: Action) => {
  switch (action.type) {
    case "UPDATE_LINES": {
      return {
        ...state,
        lines: updateLines(action.markers),
      };
    }
    default: {
      throw Error(
        `lineReducer got an unknown action. Error: ${JSON.stringify(
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
  lineReducer,
  initialState,
);
