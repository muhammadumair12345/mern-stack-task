import { API } from "../utils/httpHeader";

export const signin = (authData) => {
  return API.post("/auth/signin", authData);
};
