export type User = {
  _id: string;
  name: string;
  email: string;
};

export type NewUser = Omit<User, "_id"> & {
  password: string;
};

export type ErrorAuth = {
  hasError: boolean;
  message: string | null;
  status: number | null;
  details: Array<{
    field: string;
    error: string;
  }>;
  code: string | null;
};

export type ContextType = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  message: string | null;
  error: ErrorAuth;
  loading: boolean;
  userAuthenticated: () => void;
  userSignUp: (data: { name: string; email: string; password: string }) => void;
  userLogin: (data: { email: string; password: string }) => void;
  userLogout: () => void;
};

export type AuthState = {
  token: string;
  isAuthenticated: boolean;
  user: User | null;
  error: ErrorAuth;
  message: string | null;
  loading: boolean;
};

export type AuthAction =
  | { type: "LOGIN"; payload: { token: string; user: User } }
  | { type: "REGISTER"; payload: string }
  | { type: "CHECK_AUTH"; payload: User }
  | { type: "ERROR"; payload: ErrorAuth }
  | { type: "CLEAN_ALERT" }
  | { type: "LOGOUT" };

export enum AuthActionTypes {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  CHECK_AUTH = "CHECK_AUTH",
  ERROR = "ERROR",
  CLEAN_ALERT = "CLEAN_ALERT",
  LOGOUT = "LOGOUT",
}
