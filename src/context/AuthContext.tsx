import { createContext, ReactNode, useState } from "react";
import { UserProps } from "../lib/props/UserProps";
import { api } from "../services/api";
import { Alert } from "react-native";
import { NewUserProps } from "../lib/props/NewUserProps";
import { isAxiosError, AxiosError } from "axios";

export type AuthContextDataProps = {
  user: UserProps;
  isUserLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (data: NewUserProps) => Promise<void>;
  logOut: () => void;
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
    await api
      .post("login", { email, password })
      .then((response) => {
        const data: UserProps = response.data;
        setUser(data);
      })
      .catch(() => {
        Alert.alert(`Não autenticado`, `Email e/ou senha inválido(s)`);
      })
      .finally(() => {
        setisUserLoading(false);
      });
  }

  async function signUp(newUser: NewUserProps) {
    setisUserLoading(true);

    await api
      .post("signUp", newUser)
      .then((response) => {
        const data: UserProps = response.data;
        setUser(data);
      })
      .catch((error: Error | AxiosError) => {
        if (isAxiosError(error)) {
          Alert.alert(
            `Error ${error.response?.status}`,
            `${error.response?.data.message}`
          );
        } else {
          Alert.alert(
            `Error`,
            `Algo de errado aconteceu, verifique os dados inseridos.`
          );
        }
      })
      .finally(() => {
        setisUserLoading(false);
      });
  }

  function logOut() {
    setUser({} as UserProps);
  }

  return (
    <AuthContext.Provider
      value={{ user, isUserLoading, login, signUp, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
