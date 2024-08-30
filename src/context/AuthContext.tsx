import { createContext, ReactNode, useState } from "react";
import { UserBasicProps, UserProps } from "../lib/props/UserProps";
import { api } from "../services/api";
import { Alert } from "react-native";
import { NewUserProps } from "../lib/props/NewUserProps";
import {
  UpdateUserAddressProps,
  UpdateUserContactProps,
} from "../lib/props/UpdateUserProps";
import { errorHandler } from "../utils/errorHandler";
import { useNavigation } from "@react-navigation/native";

export type AuthContextDataProps = {
  user: UserBasicProps;
  isUserLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (data: NewUserProps) => Promise<void>;
  getInfo(): Promise<UserProps | null>
  updateUserContact: (data: UpdateUserContactProps) => Promise<boolean>;
  updateUserAddress: (data: UpdateUserAddressProps) => Promise<boolean>;
  logOut: () => void;
};

export type AuthContextProviderProps = {
  children: ReactNode;
};

type DataAuthResponseProps ={
  token: string;
  user: UserBasicProps;
};

type DataGetInfoResponseProps = {
  user: UserProps;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserBasicProps>({} as UserBasicProps);
  const [isUserLoading, setIsUserLoading] = useState(false);

  async function login(email: string, password: string) {
    setIsUserLoading(true);
    await api
      .post("login", { email, password })
      .then((response) => {
        const data: DataAuthResponseProps = response.data;
        console.log(data);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        setUser(data.user);
      })
      .catch((err) => {
        errorHandler(err);
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  }

  async function signUp(newUser: NewUserProps) {
    setIsUserLoading(true);

    if (!newUser.address){
      delete newUser.address;
    }

    await api
      .post("signup", newUser)
      .then((response) => {
        const data: DataAuthResponseProps = response.data;
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        setUser(data.user);
      })
      .catch((err) => {
        errorHandler(err);
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  }

  async function getInfo() {
    return await api
      .get("/")
      .then((response) => {
        const data: DataGetInfoResponseProps = response.data;
        console.log(data);

        return data.user;
      })
      .catch((err) => {
        errorHandler(err);
        return null;
      })
  }

  async function updateUserContact(updateUserContact: UpdateUserContactProps) {
    setIsUserLoading(true);

    return await api
      .patch("/", updateUserContact)
      .then(() => {
        setUser({
          ...user,
          name: updateUserContact.name,
        });
        return true;
      })
      .catch((err) => {
        errorHandler(err);
        return false;
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  }

  async function updateUserAddress(updateUserAddress: UpdateUserAddressProps) {
    setIsUserLoading(true);

    return await api
      .patch("/", {
        address: updateUserAddress
      })
      .then(() => {
        return true;
      })
      .catch((err) => {
        errorHandler(err);
        return false;
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  }

  async function logOut() {
    await api
    .post("logout")
    .then((response) => {
        api.defaults.headers.common["Authorization"] = undefined;
        setUser({} as UserBasicProps);
      })
      .catch((err) => {
        errorHandler(err);
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isUserLoading,
        login,
        signUp,
        getInfo,
        updateUserContact,
        updateUserAddress,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
