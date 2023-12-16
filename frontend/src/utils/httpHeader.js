import axios from "axios";
import Cookies from "js-cookie";

export const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((req) => {
  const token = Cookies.get("token");

  if (token) {
    req.headers.authorization = token;
  }
  return req;
});
