import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserProfileView = () => {
  const globalState = useSelector((state) => state);

  if (!globalState.auth.isLogged) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container my-4">
      <div className="row">
        <h1 className="text-center mt-4 mb-0 display-2">
          {globalState.auth.currentLoggedUser.name}
        </h1>
        <img
          src={globalState.auth.currentLoggedUser.avatar}
          className="rounded mx-auto d-block w-25"
          alt="avatar"
        />
      </div>
    </div>
  );
};

export default UserProfileView;
