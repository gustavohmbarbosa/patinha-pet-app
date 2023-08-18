import { createContext, ReactNode, useState } from "react";
import { UserProps } from "../lib/props/UserProps";
import { api } from "../services/api";
import { Alert } from "react-native";
import { NewUserProps } from "../lib/props/NewUserProps";
import { isAxiosError, AxiosError } from "axios";
import {
  UpdateUserAddressProps,
  UpdateUserContactProps,
} from "../lib/props/UpdateUserProps";
import { errorHandler } from "../utils/errorHandler";

export type AuthContextDataProps = {
  user: UserProps;
  isUserLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (data: NewUserProps) => Promise<void>;
  updateUserContact: (data: UpdateUserContactProps) => Promise<void>;
  updateUserAddress: (data: UpdateUserAddressProps) => Promise<void>;
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

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

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
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        setUser(data);
      })
      .catch((err) => {
        errorHandler(err);
      })
      .finally(() => {
        setisUserLoading(false);
      });
  }

  async function updateUserContact(updateUserContact: UpdateUserContactProps) {
    setisUserLoading(true);

    await api
      .put("update-contact", updateUserContact)
      .then(() => {
        setUser({
          ...user,
          user: {
            ...user.user,
            firstName: updateUserContact.firstName,
            lastName: updateUserContact.lastName,
            phone: updateUserContact.phone,
          },
        });
      })
      .catch((err) => {
        errorHandler(err);
      })
      .finally(() => {
        setisUserLoading(false);
      });
  }

  async function updateUserAddress(updateUserAddress: UpdateUserAddressProps) {
    setisUserLoading(true);

    await api
      .put("update-address", updateUserAddress)
      .then(() => {
        setUser({
          ...user,
          user: {
            ...user.user,
            address: updateUserAddress,
          },
        });
      })
      .catch((err) => {
        errorHandler(err);
      })
      .finally(() => {
        setisUserLoading(false);
      });
  }

  function logOut() {
    setUser({} as UserProps);
    api.defaults.headers.common["Authorization"] = undefined;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isUserLoading,
        login,
        signUp,
        updateUserContact,
        updateUserAddress,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
