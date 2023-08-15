import { createContext, ReactNode, useState } from "react";
import { UserProps } from "../lib/props/UserProps";
import { api } from "../services/api";
import { Loading } from "../components/Loading";
import { Alert } from "react-native";

export type AuthContextDataProps = {
  user: UserProps;
  isUserLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: () => Promise<void>;
};

export type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [isUserLoading, setisUserLoading] = useState(false);

  async function login(email: string, password: string) {
    setisUserLoading(true);
    try {
      const response = await api.post("login", { email, password });
      const data: UserProps = response.data;
      setUser(data);
      console.log(data);
    } catch (error) {
      Alert.alert("Não autorizado", "Dado(s) inválidos.");
    } finally {
      setisUserLoading(false);
    }
  }

  async function signUp() {}

  return (
    <AuthContext.Provider value={{ user, isUserLoading, login, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
