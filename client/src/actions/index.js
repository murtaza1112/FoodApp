import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current");
  console.log(res);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const checkUser = (user) => async (dispatch) => {
  console.log("User is checked.")
  const res = await axios.post("/api/login",user);
  console.log(res);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const LogOutUser = (user) => async (dispatch) => {
  console.log("User is begin loged out.");
  const res = await axios.get("/api/logout");
  console.log(res);
  dispatch({ type: FETCH_USER, payload: false });
};


export const createUser = (user) => async (dispatch) => {
  const res = await axios.post("/api/signup",user);
  console.log(res);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const addInList = (id) => async (dispatch) => {
  const res = await axios.patch(`/api/list/`+id, id);
  console.log(res);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const removeFromList = (id) => async (dispatch) => {
  console.log("Delete called");
  const res = await axios.post(`/api/list/` + id, id);
  console.log(res);
  dispatch({ type: FETCH_USER, payload: res.data });
};
