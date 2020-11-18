import { ADD_MESSAGE, REMOVE_MESSAGE } from "../actions/types";
const INTIAL_STATE = [];

export const messageReducer = (state = INTIAL_STATE, action) => {
    // console.log(action);
  switch (action.type) {
    case ADD_MESSAGE: {
      return [...state, action.payload];
    }
    case REMOVE_MESSAGE: {
      return state.filter((elem, index) => index != 1);
    }
    default: {
      return state;
    }
  }
};
