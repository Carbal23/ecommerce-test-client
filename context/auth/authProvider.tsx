"use client";

import { useCallback, useEffect, useMemo, useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import { initialState } from "./initialState";
import { AuthActionTypes, NewUser, User } from "./types";
import { ApiError, useApi } from "@/hooks/useApi";
import { paths } from "@/utils/apiPaths";
import { useTokenAuth } from "@/hooks/useTokenAuth";

type Props = {
  children: React.ReactElement;
};

const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { token, setToken } = useTokenAuth();
  const { get, post } = useApi();

  const userAuthenticated = useCallback(async () => {
    if (!token) {
      dispatch({ type: AuthActionTypes.CLEAN_ALERT });
      return;
    }

    try {
      const res = await get<{ success:boolean, user: User }>(paths.auth.me);
      dispatch({
        type: AuthActionTypes.CHECK_AUTH,
        payload: res.user,
      });
    } catch (e) {
      console.error(e);
      dispatch({ type: AuthActionTypes.LOGOUT });
    }
  }, [token, get]);

  useEffect(() => {
    userAuthenticated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userLogin = useCallback(
    async (data: { email: string; password: string }) => {
      try {
        const res = await post<
          { email: string; password: string },
          { success:boolean, token: string; user: User }
        >(paths.auth.login, data);
        setToken(res.token);
        dispatch({
          type: AuthActionTypes.LOGIN,
          payload: res,
        });
      } catch (error) {
        const apiError = error as ApiError;
        const errorPayload = {
          hasError: true,
          message: apiError.message || "Error en el login",
          status: apiError.status || 500,
          details: apiError.details || [],
          code: apiError.code || "LOGIN_ERROR",
        };

        console.error("Error Login:", apiError);

        dispatch({
          type: AuthActionTypes.ERROR,
          payload: errorPayload,
        });

        throw errorPayload;
      } finally {
        setTimeout(() => {
          dispatch({ type: AuthActionTypes.CLEAN_ALERT });
        }, 3000);
      }
    },
    [post, setToken]
  );

  const userSignUp = useCallback(
    async (data: NewUser) => {
      try {
        const res = await post<NewUser, { success: boolean; message: string }>(
          paths.user.newUser,
          data
        );
        dispatch({
          type: AuthActionTypes.REGISTER,
          payload: res.success
            ? res.message
            : "Usuario registrado correctamente",
        });
      } catch (error) {
        const apiError = error as ApiError;
        const errorPayload = {
          hasError: true,
          message: apiError.message || "Error en el registro",
          status: apiError.status || 500,
          details: apiError.details || [],
          code: apiError.code || "REGISTRATION_ERROR",
        };

        console.error("Error en registro:", apiError);

        dispatch({
          type: AuthActionTypes.ERROR,
          payload: errorPayload,
        });

        throw errorPayload;
      } finally {
        setTimeout(() => {
          dispatch({ type: AuthActionTypes.CLEAN_ALERT });
        }, 3000);
      }
    },
    [post]
  );

  const userLogout = useCallback(() => {
    dispatch({ type: AuthActionTypes.LOGOUT });
  }, []);

  const memoValue = useMemo(() => {
    return {
      isAuthenticated: state.isAuthenticated,
      token: state.token,
      user: state.user,
      error: state.error,
      message: state.message,
      loading: state.loading,
      userAuthenticated,
      userSignUp,
      userLogin,
      userLogout,
    };
  }, [
    state.isAuthenticated,
    state.message,
    state.token,
    state.user,
    state.error,
    state.loading,
    userAuthenticated,
    userSignUp,
    userLogin,
    userLogout,
  ]);

  return (
    <AuthContext.Provider value={memoValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
