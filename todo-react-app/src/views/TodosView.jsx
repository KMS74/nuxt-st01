import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTodos } from "../store/authSlice";
import { Navigate } from "react-router-dom";
import {
  createTodoTask,
  deleteTodoTask,
  ToggleTodoTask,
} from "../store/authSlice";

const TodosView = () => {
  const globalState = useSelector((state) => state);
  const todos = useSelector((state) => state.auth.todos);

  const [todoTask, setTodoTask] = useState("");

  if (!globalState.auth.isLogged) {
    return <Navigate to="/login" replace />;
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const addTodoHandler = () => {
    dispatch(createTodoTask(todoTask));
    setTodoTask("");
  };

  const deleteTodoHandler = (id) => {
    dispatch(deleteTodoTask(id));
  };

  const toggleTodoHandler = (id) => {
    dispatch(ToggleTodoTask(id));
  };

  return (
    <div className="container my-4">
      <h1 className="display-3 text-center my-4">Todo List App</h1>
      {/* Todo Form */}
      <div class="row w-75  mx-auto my-4">
        <div class="col-10">
          <input
            class="form-control"
            type="text"
            value={todoTask}
            onChange={(e) => setTodoTask(e.target.value)}
            placeholder="Add todo item.."
          />
        </div>
        <div class="col-2">
          <button
            type="submit"
            onClick={addTodoHandler}
            class="btn btn-primary"
          >
            Add Todo
          </button>
        </div>
      </div>

      {/* Todo Table */}
      <table class="table my-4">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tasks</th>
            <th scope="col">Completed</th>
            <th scope="col">Actios</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, i) => (
            <tr>
              <th scope="row">{i + 1}</th>
              <td>{todo.task}</td>
              <td>{todo.completed ? "Done" : "Not Done"}</td>
              <td class="d-flex gap-3">
                <button
                  disabled={todo.completed}
                  onClick={() => toggleTodoHandler(todo.id)}
                  className="btn btn-sm btn-outline-success"
                >
                  Done
                </button>
                <button
                  onClick={() => deleteTodoHandler(todo.id)}
                  className="btn btn-sm btn-outline-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodosView;
