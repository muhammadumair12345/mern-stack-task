import { API } from "../utils/httpHeader";

export const getUsers = async (obj) => {
  const params = obj.queryKey[1];
  return await API.get("/users", { params });
};

export const getUserById = async (obj) => {
  const id = obj.queryKey[1];
  return await API.get(`/users/${id}`);
};

export const addUser = async (user) => {
  return await API.post("/users", user);
};

export const editUser = async (user) => {
  console.log(user);
  return await API.patch(`/users/${user._id}`, user);
};

export const deleteUser = async (id) => {
  return await API.delete(`/users/${id}`);
};
