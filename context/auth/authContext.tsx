import { createContext } from "react";
import { ContextType } from "./types";

const defatulContext: ContextType = {
  token: "",
  user: null,
  isAuthenticated: false,
  message: null,
  error: {
    hasError: false,
    message: null,
    status: null,
    details: [],
    code: null,
  },
  loading: true,
  userAuthenticated: () => {},
  userSignUp: () => {},
  userLogin: () => {},
  userLogout: () => {},
};

const authContext = createContext(defatulContext);

export default authContext;
