import { AxiosResponse, isAxiosError } from "axios";
import { Alert } from "react-native";
import { BackUserErrorProps } from "../lib/props/ErrorProps";

const alertError = (apiError: AxiosResponse<any, any>) => {
  if (apiError.status === 403)
    return Alert.alert(
      "Não autenticado",
      "Verifique os dados inseridos ou tente novamente mais tarde."
    );
  var messageError = "";
  const errors = apiError.data.errors;
  if (errors) {
    const keys = Object.keys(errors);
    console.log(keys);
    keys.forEach((key) => {
      messageError = `${messageError}\n- ${errors[key]}`;
    });
  } else {
    messageError = `${apiError.data.message}`;
  }

  return Alert.alert(`${apiError.data.message}`, messageError);
};

export const errorHandler = (error: unknown) => {
  if (isAxiosError(error)) {
    if (error.response) {
      alertError(error.response);
    }
  }
};
