import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTodos } from "../store/authSlice";
import { Navigate } from "react-router-dom";

const TodosView = () => {
  const globalState = useSelector((state) => state);

  if (!globalState.auth.isLogged) {
    return <Navigate to="/login" replace />;
  }

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("TODO VIEW ...");
    dispatch(fetchTodos());
  }, [dispatch]);

  const todoList = globalState.auth.todos.map((todo) => (
    <li value={todo.task} key={todo.id}>
      {todo.task}
    </li>
  ));

  return (
    <div className="container text-center my-4">
      <h1>Todos View</h1>
      <ul>{todoList}</ul>
    </div>
  );
};

export default TodosView;
