"use client";

import { createContext, useContext, useEffect, useReducer, useCallback } from "react";
import { signIn as signInApi, signUp as signUpApi } from "../lib/api/auth";

const initialState = {
  user: null,
  accessToken: null,
  loading: true,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: null };
    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        loading: false,
        error: null,
      };
    case "AUTH_ERROR":
      return { ...state, loading: false, error: action.payload, user: null, accessToken: null };
    case "LOGOUT":
      return { ...initialState, loading: false };
    default:
      return state;
  }
}

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restore from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userJson = localStorage.getItem("user");
    if (token && userJson) {
      dispatch({ type: "AUTH_SUCCESS", payload: { accessToken: token, user: JSON.parse(userJson) } });
    } else {
      dispatch({ type: "LOGOUT" });
    }
  }, []);

  const persist = (data) => {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const signIn = useCallback(async (credentials) => {
    dispatch({ type: "AUTH_START" });
    try {
      const data = await signInApi(credentials); // { user, accessToken }
      persist(data);
      dispatch({ type: "AUTH_SUCCESS", payload: data });
      return data;
    } catch (err) {
      dispatch({ type: "AUTH_ERROR", payload: err.message });
      throw err;
    }
  }, []);

  const signUp = useCallback(async (payload) => {
    dispatch({ type: "AUTH_START" });
    try {
      const data = await signUpApi(payload); // returns created user, NOT accessToken per your docs
      dispatch({ type: "AUTH_SUCCESS", payload: { user: data, accessToken: null } });
      return data;
    } catch (err) {
      dispatch({ type: "AUTH_ERROR", payload: err.message });
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  }, []);

   const updateUser = useCallback((partialUser) => {
    dispatch({ type: "UPDATE_USER", payload: partialUser });
 
    const stored = localStorage.getItem("user");
    if (stored) {
      const merged = { ...JSON.parse(stored), ...partialUser };
      localStorage.setItem("user", JSON.stringify(merged));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, signIn, signUp, logout,updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}