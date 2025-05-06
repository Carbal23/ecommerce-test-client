import { AuthState } from "./types";

export const initialState: AuthState = {
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
  message: null,
  loading: true,
};
