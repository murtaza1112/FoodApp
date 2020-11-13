import { FETCH_SIZE} from "../actions/types";

const INTIAL_STATE = {
  indian: 0,
  continental: 0,
  italian: 0,
  chinese: 0,
};
export const sizeReducer = (state = INTIAL_STATE, action) => {

  switch (action.type) {
    case FETCH_SIZE: {
      return {...state,...action.payload};
    }
    default:
      return state;
  }
};
