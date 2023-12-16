import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const HOC = ({ children }) => {
  const { auth } = useAuth();

  return auth?.token === "" ? <Navigate to="/signin" /> : children;
};

export default HOC;
