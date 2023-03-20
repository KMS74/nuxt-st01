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
