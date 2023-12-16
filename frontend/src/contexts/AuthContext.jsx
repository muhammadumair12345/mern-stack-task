import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { failure, success } from "../utils/notifications";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signin } from "../services/auth";

export const AuthContext = createContext("");

export const useAuth = () => {
  return useContext(AuthContext);
};

const initialState = {
  token: Cookies.get("token") || "",
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(initialState);

  const { mutate, isPending } = useMutation({
    mutationFn: signin,
    onSuccess: ({ data }) => {
      success(data?.message);
      setAuth({ token: data?.data?.token });
      Cookies.set("token", data?.data?.token, {
        expires: 0.5,
      });
      navigate("/");
    },
    onError: (error) => {
      failure(error.message);
    },
  });

  const signout = () => {
    Cookies.remove("token");
    setAuth(initialState);
    navigate("/signin");
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        signin: mutate,
        signout,
        isLoading: isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
