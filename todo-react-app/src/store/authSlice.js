import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "./../utils/axios-common";
import {
  getTodos,
  addTodoTask,
  deleteTodo,
  todoToggle,
} from "../utils/todos-services";

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
    console.log("STATE");
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

export const createTodoTask = createAsyncThunk(
  "auth/addTodo",
  async (task, thunkAPI) => {
    const state = thunkAPI.getState();
    const auth = {
      username: state.auth.currentLoggedUser.username,
      password: state.auth.currentLoggedUser.password,
    };
    const res = await addTodoTask(auth, task);
    console.log(res);
    return res.data;
  }
);

export const deleteTodoTask = createAsyncThunk(
  "auth/deleteTodo",
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    const auth = {
      username: state.auth.currentLoggedUser.username,
      password: state.auth.currentLoggedUser.password,
    };
    console.log("delelting todo...");
    const res = await deleteTodo(auth, id);
    console.log(res);
    if (res.status == 200) {
      console.log(id);
      return id;
    }
  }
);

export const ToggleTodoTask = createAsyncThunk(
  "auth/toggle",
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    const auth = {
      username: state.auth.currentLoggedUser.username,
      password: state.auth.currentLoggedUser.password,
    };
    console.log("toggling todo...");
    const res = await todoToggle(auth, id);
    console.log(res);
    console.log(id);
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
    [createTodoTask.fulfilled]: (state, action) => {
      state.todos.push(action.payload);
    },
    [deleteTodoTask.fulfilled]: (state, action) => {
      console.log("deleteing ....");
      state.todos = state.todos.filter((todo) => todo.id != action.payload);
    },
    [ToggleTodoTask.fulfilled]: (state, action) => {
      console.log("toggglingg...");
      console.log(action.payload);
      const todo = state.todos.find((todo) => todo.id == action.payload.id);
      todo.completed = !todo.completed;
      state.todos = [...state.todos, todo];
    },
  },
});
export default authSlice.reducer;

export const { login, logout } = authSlice.actions;
