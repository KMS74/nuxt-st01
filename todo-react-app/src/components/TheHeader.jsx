import React from "react";
import logo from "../assets/homework.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";

const TheHeader = () => {
  const globalState = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          <img height="64px" src={logo} />
        </NavLink>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav fs-4 w-100 mt-2 mt-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Todos
              </NavLink>
            </li>
            {globalState.auth.isLogged && (
              <li className="nav-item dropdown ms-auto">
                <button
                  className="btn  btn-primary dropdown-toggle"
                  type="button"
                  id="triggerId"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {globalState.auth.currentLoggedUser.name}
                </button>
                <div className="dropdown-menu" aria-labelledby="triggerId">
                  <NavLink
                    to={
                      "/profile/" + globalState.auth.currentLoggedUser.username
                    }
                    type="button"
                    className="dropdown-item"
                  >
                    Profile
                  </NavLink>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      dispatch(logout());
                      navigate("/login");
                    }}
                  >
                    Logout
                  </button>
                </div>
              </li>
            )}

            {!globalState.auth.isLogged && (
              <li className="nav-item ms-auto">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TheHeader;
