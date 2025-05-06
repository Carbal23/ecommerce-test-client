import { AuthAction, AuthState } from "./types";

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
        error: {
          hasError: false,
          message: null,
          status: null,
          details: [],
          code: null,
        },
        loading: false,
      };
    case "REGISTER":
      return {
        ...state,
        message: action.payload,
        error: {
          hasError: false,
          message: null,
          status: null,
          details: [],
          code: null,
        },
        loading: false,
      };
    case "CHECK_AUTH":
      return {
        ...state,
        token: localStorage.getItem("token") as string,
        isAuthenticated: true,
        user: action.payload,
        error: {
          hasError: false,
          message: null,
          status: null,
          details: [],
          code: null,
        },
        loading: false,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
        message: null,
        loading: false,
      };
    case "CLEAN_ALERT":
      return {
        ...state,
        error: {
          hasError: false,
          message: null,
          status: null,
          details: [],
          code: null,
        },
        message: null,
        loading: false,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        isAuthenticated: false,
        user: null,
        error: {
          hasError: false,
          message: null,
          status: null,
          details: [],
          code: null,
        },
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
