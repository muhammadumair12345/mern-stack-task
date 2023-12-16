import { API } from "../utils/httpHeader";

export const getUsers = (obj) => {
  const params = obj.queryKey[1];
  return API.get("/users", { params });
};

export const getUserById = (obj) => {
  const id = obj.queryKey[1];
  return API.get(`/users/${id}`);
};

export const addUser = (user) => {
  return API.post("/users", user);
};

export const deleteUser = (id) => {
  console.log(id);
  return API.delete(`/users/${id}`);
};
