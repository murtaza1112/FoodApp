import { FETCH_USER } from "../actions/types";

// three cases of authreducer present:
// 1.still processing if the user is logged in or out:return null
// 2.if user is logged in :return Object
// 3.If user is logged out:return false
export const authReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_USER: {
      return action.payload || false;
    }
    default:
      return state;
  }
};

