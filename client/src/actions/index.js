import axios from "axios";
import {
  FETCH_USER,
  UPDATE_USER,
  DELETE_ITEM,
  FETCH_ITEMS,
  UPDATE_ITEM,
  CREATE_ITEM,
  FETCH_ITEM,
  FETCH_SIZE,
  ADD_MESSAGE,
  REMOVE_MESSAGE,
} from "./types";
import history from "../history";

//User actions
//signUp
export const createUser = (user) => async (dispatch) => {
  const res = await axios.post("/api/signup", user);
  // console.log(res);
  dispatch({ type: FETCH_USER, payload: res.data });
};

//signIn
export const checkUser = (user) => async (dispatch) => {
  console.log("User is checked.");
  const res = await axios.post("/api/login", user);
  console.log(res);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const googleSignIn = () => async (dispatch) => {
  console.log("User is logged in by google.");
  const res = await axios.get("http://localhost:5000/auth/google");
  // console.log(res);
  dispatch({ type: FETCH_USER, payload: res.data });
};
//getUser
export const fetchUser = () => async (dispatch) => {
  console.log("User is beign fethced.");
  const res = await axios.get("/api/current");
  // console.log(res);
  dispatch({ type: FETCH_USER, payload: res.data });
};

//logOutUser
export const LogOutUser = () => async (dispatch) => {
  console.log("User is begin loged out.");
  const res = await axios.get("/api/logout");
  // console.log(res);
  //redirecet user to homepage//login
  history.push("/login");
  dispatch({ type: FETCH_USER, payload: false });
};

//update_user
export const addInList = (item) => async (dispatch) => {
  console.log("Add in list.", item);
  const res = await axios.post(`/api/user/`, item);
  // console.log(res);
  dispatch({ type: FETCH_USER, payload: res.data });
};
//update_user
export const removeFromList = (id) => async (dispatch) => {
  console.log("Delete from list", id);
  const res = await axios.delete(`/api/user`, { data: { id } });
  // console.log(res);
  dispatch({ type: FETCH_USER, payload: res.data });
};

//List actions

//get entire list of a category
const baseUrl = "/api/list/";

export const createItem = (item, type) => async (dispatch) => {
  console.log(type);
  const res = await axios.post(baseUrl + type, item);
  // console.log(res);
  history.push("/admin");
  dispatch({ type: CREATE_ITEM, payload: res.data });
};

export const fetchItems = (type) => async (dispatch) => {
  const res = await axios.get(baseUrl + type);
  // console.log(res);
  dispatch({ type: FETCH_ITEMS, payload: [res.data, type] });
};

export const fetchItem = (id) => async (dispatch) => {
  const res = await axios.get(baseUrl + "single/" + id);
  console.log("Usre has to be fethced.");
  // console.log(res);
  dispatch({ type: FETCH_ITEM, payload: res.data });
};

export const removeItem = (id, type) => async (dispatch) => {
  console.log("Delete item");
  const res = await axios.delete(baseUrl + type + "/" + id, { data: { id } });
  // console.log(res);
  dispatch({ type: DELETE_ITEM, payload: res.data });
};

export const updateItem = (item, oldItem) => async (dispatch) => {
  console.log("updating item");
  const res = await axios.patch(baseUrl + oldItem.type + "/" + item._id, item);
  // console.log(res);
  history.push("/admin");
  dispatch({ type: UPDATE_ITEM, payload: { oldItem, data: res.data } });
};

//size actions
const paginateUrl = "/api/paginate";
const sizeUrl = "/api/size";
export const getMaxLength = (type) => async (dispatch) => {
  console.log("Getting max length of ", type);
  const res = await axios.get(sizeUrl + "/" + type);
  // console.log(res);
  dispatch({ type: FETCH_SIZE, payload: res.data });
};

//paginate action
export const getNextContent = (value) => async (dispatch) => {
  console.log("getting next content", value);
  const res = await axios.post(paginateUrl, value);
  console.log(res);
  dispatch({ type: FETCH_ITEMS, payload: [res.data, value.type] });
};

//MESSAGES ERROR
//remove messages

export const removeMessage = () => (dispatch) => {
  console.log("Removing message");
  dispatch({ type: REMOVE_MESSAGE });
};

export const addMessage = (message) => (dispatch) => {
  console.log("Adding message", message);
  dispatch({ type: ADD_MESSAGE, payload: message });
};
