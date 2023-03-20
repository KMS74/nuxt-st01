import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../store/authSlice";
import { useEffect, useState } from "react";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const LoginView = () => {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const userListOptions = globalState.auth.users.map((user) => (
    <option value={user.username} key={user.id}>
      {user.username}
    </option>
  ));

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
    setPassword("");
    navigate("/");
  };

  return (
    <div onSubmit={onSubmitHandler} className="container w-25 my-4">
      <form className="">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <select
            className="form-select"
            id="username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          >
            <option defaultValue>Select the username</option>
            {userListOptions}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginView;
