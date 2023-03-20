import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./../utils/axios-common";
import { getTodos } from "../utils/todos-services";

export const getLoggedUserTodos = createAsyncThunk(
  "todo/getTodos",
    async () => {
      const res = await getTodos({})
  }
);

const todos = [];

const todoSlice = createSlice({
  name: "todo",
  initialState: todos,
  reducers: {},
  extraReducers: {},
});

export default todoSlice.reducer;
