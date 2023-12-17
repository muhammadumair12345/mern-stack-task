import { API } from "../utils/httpHeader";

export const signin = async (authData) => {
  return await API.post("/auth/signin", authData);
};
