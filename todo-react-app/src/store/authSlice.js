import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "./../utils/axios-common";
import { getTodos } from "../utils/todos-services";
import axios from "axios";

const initialState = {
  users: [],
  isLogged: false,
  currentLoggedUser: null,
  todos: [],
};

export const fetchTodos = createAsyncThunk(
  "auth/todos",
  async (_, thunkAPI) => {
    console.log("fetching todos....");
    const state = thunkAPI.getState();
    console.log(state);
    const auth = {
      username: state.auth.currentLoggedUser.username,
      password: state.auth.currentLoggedUser.password,
    };
    const res = await getTodos(auth);
    console.log(res);
    return res.data;
  }
);

export const getUsers = createAsyncThunk("auth/users", async () => {
  const res = await http.get("/users");
  if (res.status == 200) return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const user = state.users.find(
        (user) => user.username == action.payload.username
      );
      if (user) {
        state.isLogged = true;
        state.currentLoggedUser = { ...user };
        state.currentLoggedUser.password = action.payload.password;
      }
    },
    logout: (state, action) => {
      state.isLogged = false;
      state.currentLoggedUser = null;
    },
  },
  extraReducers: {
    [getUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.todos = action.payload;
    },
  },
});
export default authSlice.reducer;

export const { login, logout } = authSlice.actions;
