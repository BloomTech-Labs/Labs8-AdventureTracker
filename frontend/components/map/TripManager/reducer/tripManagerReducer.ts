import {Trip} from "../../interfaces/trip.interface";
import {useReducer} from "react";
import updateTrip from "./lib/helpers/updateTrip";

interface Action {
  type: string;
  [key: string]: any;
  trip: Trip;
  props: object;
}

type Filter = "ALL" | "ACTIVE" | "ARCHIVED";

interface State {
  trips: Trip[];
  filter: Filter;
  isLoading: boolean;
  hasError: boolean;
}
const initialState = {
  trips: [],
  filter: "ALL",
  isLoading: false,
  hasError: false,
};
const tripManagerReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "FETCHING_TRIPS": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCHED_TRIPS": {
      return {
        ...state,
        isLoading: false,
        trips: action.trips,
      };
    }
    case "ERROR_FETCHING_TRIPS": {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    }
    case "UPDATE_TRIP": {
      return {
        ...state,
        trips: updateTrip(state.trips, action.tripId, action.props),
      };
    }
    case "SET_FILTER": {
      return {
        ...state,
        filter: action.filter,
      };
    }
    default: {
      throw Error(
        `tripManagerReducer got an unknown action. Error: ${JSON.stringify(
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
  tripManagerReducer,
  initialState,
);
