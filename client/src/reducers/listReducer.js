import {
  CREATE_ITEM,
  FETCH_ITEMS,
  UPDATE_ITEM,
  DELETE_ITEM,
  FETCH_ITEM
} from "../actions/types";
import _ from "lodash";

const INTIAL_STATE = {
  indian: {},
  continental: {},
  italian: {},
  chinese: {},
};

export const listReducer = (state = INTIAL_STATE, action) => {
  // console.log(action.payload);
  console.log(action.payload);
  if(!action.payload)
  return state;
 
  switch (action.type) {
    case CREATE_ITEM:
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          [action.payload._id]: action.payload,
        },
      };
    case FETCH_ITEM:
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          [action.payload._id]: action.payload,
        },
      };
    case UPDATE_ITEM:{
      
      var current = {
        ...state,
        [action.payload.oldItem.type]: {
          ..._.omit(state[action.payload.oldItem.type], action.payload.oldItem._id),
        },
      };
      if(current.undefined)
      delete current.undefined;
      console.log(current);
      return {
        ...current,
        [action.payload.data.type]: {
          ...current[action.payload.data.type],
          [action.payload.data._id]: action.payload.data,
        },
      };

    }
    case FETCH_ITEMS:
      return {
        ...state,
        [action.payload[1]]: {
          ...state[action.payload[1]],
          ..._.mapKeys(action.payload[0], "_id"),
        },
      };
    case DELETE_ITEM:
      return {
        ...state,
        [action.payload.type]: {
          ..._.omit(state[action.payload.type], action.payload._id),
        },
      };
    default:
      return state;
  }
};
