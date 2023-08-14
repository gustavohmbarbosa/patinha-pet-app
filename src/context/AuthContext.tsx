import { createContext, ReactNode, useState } from "react";
import { UserProps } from "../lib/props/UserProps";
import { api } from "../services/api";
import { Loading } from "../components/Loading";

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
  const [isUserLoading, setisUserLoading] = useState(false);

  async function login() {
    setisUserLoading(true);
    try {
      const dataTeste = { email: "luan@gmail.com", password: "@Luan123" };

      const { data } = await api.post("login", dataTeste);
      setUser(data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setisUserLoading(false);
    }
  }

  async function signUp() {}

  return (
    <AuthContext.Provider value={{ user, isUserLoading, login, signUp }}>
      {isUserLoading ? <Loading /> : <>{children}</>}
    </AuthContext.Provider>
  );
}
