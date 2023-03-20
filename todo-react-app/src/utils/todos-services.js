import axios from "axios";

const TOKEN = "enVja2VyOjEyMzQ1Ng==";

const axiosObj = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-type": "application/json",
    Authorization: `Authorization: Basic ${TOKEN}`,
  },
});

export const getTodos = (authData) => {
  return axiosObj.get("/todos", { auth: authData });
};

export const addTodoTask = (authData, task) => {
  return axiosObj.post(
    "/todos",
    {
      task,
    },
    { auth: authData }
  );
};

export const deleteTodo = (authData, id) => {
  return axiosObj.delete(`/todos/${id}`, { auth: authData });
};

export const todoToggle = (authData, id) => {
  return axiosObj.put(`/todos/${id}`, { auth: authData });
};
