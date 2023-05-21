import React, { createContext, FC, ReactNode, useEffect } from "react";
import useAuthProvider, { IUseAuthProvider } from "./useAuthProvider";
import { useAppSelector } from "../hooks";

export const AuthContext = createContext<IUseAuthProvider | null>(null);

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const authSelector = useAppSelector((state) => state.auth);
  const auth = useAuthProvider();
  let display: React.ReactElement<any, any> | null;
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
