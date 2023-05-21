import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectAuth, setIsLoading, setUser } from "../slices/auth";
import { User } from "../service/types";
import {
  useLazyAuthCheckQuery,
  useLoginMutation,
  useLogoutMutation,
} from "../service/api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Alert } from "@mui/material";
export interface IUseAuthProvider {
  user: User | null;
  login: (username: string, password: string) => Promise<User | null>;
  isLoading: boolean;
  logout: () => Promise<boolean>;
}

const useAuthProvider = (): IUseAuthProvider => {
  const authSelector = useAppSelector((state) => state.auth);
  const authDispatch = useAppDispatch();

  const [loginApi, {}] = useLoginMutation();
  const [logoutApi, {}] = useLogoutMutation();

  const login = async (
    email: string,
    password: string
  ): Promise<User | null> => {
    try {
      let user = await loginApi({ email, password }).unwrap();
      if (user.is_admin) {
        authDispatch(setUser(user));
        return user;
      }
    } catch (e: any) {
      const MySwal = withReactContent(Swal);
      await MySwal.fire({
        html: <Alert severity="error">{e.data.error}</Alert>,
      });
    }
    setIsLoading(false);
    return null;
  };

  const logout = async (): Promise<boolean> => {
    try {
      let response = await logoutApi().unwrap();
      authDispatch(setUser(null));
      return true;
    } catch (e: any) {
      const MySwal = withReactContent(Swal);
      await MySwal.fire({
        title: "Error",
        html: <Alert severity="error">{e.response.error}</Alert>,
        confirmButtonText: "Ok",
      });
    }
    setIsLoading(false);
    return false;
  };
  return {
    user: authSelector.user,
    isLoading: authSelector.isLoading,
    login,
    logout,
  };
};
export default useAuthProvider;
