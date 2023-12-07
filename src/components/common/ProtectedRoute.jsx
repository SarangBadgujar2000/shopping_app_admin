import React from "react";
import { getCookie } from "../../utils/getCookie";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  return props.shouldLoggedIn ? 
  (
    getCookie("token") ? (<props.component />) : (<Navigate to={"/signup"} />)
  ) 
  : 
  (
    getCookie("token") ? (<Navigate to={"/dashboard"} />) : (<props.component />)
  );
};

export default ProtectedRoute;
