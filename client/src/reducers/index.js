import { authReducer } from "./authReducer";
import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import { listReducer } from "./listReducer";
import { sizeReducer } from "./sizeReducer";
import {messageReducer} from "./messageReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  list: listReducer,
  size: sizeReducer,
  message: messageReducer
});
