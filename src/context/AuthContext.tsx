import { createContext, ReactNode, useState } from "react";
import { UserProps } from "../lib/props/UserProps";

export type AuthContextDataProps = {
  user: UserProps;
  isUserLoading: boolean;
  login: () => Promise<void>;
  signUp: () => Promise<void>;
};

export type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [isUserLoading, setUserLoading] = useState(false);

  async function login() {}

  async function signUp() {}

  return (
    <AuthContext.Provider value={{ user, isUserLoading, login, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
