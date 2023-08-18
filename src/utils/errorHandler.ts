import { isAxiosError } from "axios";
import { Alert } from "react-native";
import { BackUserErrorProps } from "../lib/props/ErrorProps";

const alertError = (cod: number | string, backError: BackUserErrorProps) => {
  return Alert.alert(
    `Erro cod. ${cod}`,
    `${backError.message}${
      backError.error?.email ? `\n- ${backError.error.email}` : ""
    }${backError.error?.firstName ? `\n- ${backError.error.firstName}` : ""}${
      backError.error?.lastName ? `\n- ${backError.error.lastName}` : ""
    }${backError.error?.password ? `\n- ${backError.error.password}` : ""}${
      backError.error?.phone ? `\n- ${backError.error.phone}` : ""
    }${backError.error?.zipCode ? `\n- ${backError.error.zipCode}` : ""}${
      backError.error?.city ? `\n- ${backError.error.city}` : ""
    }${backError.error?.street ? `\n- ${backError.error.street}` : ""}${
      backError.error?.state ? `\n- ${backError.error.state}` : ""
    }${
      backError.error?.neighborhood ? `\n- ${backError.error.neighborhood}` : ""
    }`
  );
};

export const errorHandler = (error: unknown) => {
  if (isAxiosError<BackUserErrorProps>(error)) {
    if (error.response) {
      alertError(error.response.status, error.response.data);
    }
  }
};
