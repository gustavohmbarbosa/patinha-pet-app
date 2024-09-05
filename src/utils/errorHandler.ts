import { AxiosResponse, isAxiosError } from "axios";
import { Alert } from "react-native";

const alertError = (apiError: AxiosResponse<any, any>) => {
  if (apiError.status === 401)
    return Alert.alert(
      "Não autenticado",
      "Verifique os dados inseridos ou tente novamente mais tarde."
    );
  var messageError = "";
  const errors = apiError.data.errors;
  if (errors) {
    const keys = Object.keys(errors);
    keys.forEach((key) => {
      messageError = `${messageError}\n- ${errors[key]}`;
    });
  } else {
    messageError = `Aconteceu algo de errado na solicitação`;
  }

  return Alert.alert(`Erro`, apiError.data.message);
};

export const errorHandler = (error: unknown) => {
  if (isAxiosError(error)) {
    if (error.response) {
      alertError(error.response);
    }
  }
};
