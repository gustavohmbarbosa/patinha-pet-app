import { useState } from "react";
import { View } from "react-native";

import { styles } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../../components/Button";
import { TextInput } from "../../../components/TextInput";
import { TextInput as TextInputPaper } from "react-native-paper";
import { InvalidFormText } from "../../../components/Form/InvalidFormText";
import { withKeyboardAwareScrollView } from "../../../components/withKeyboardAwareScrollView";
import { NewUserProps } from "../../../lib/props/NewUserProps";
import { APPTHEME } from "../../../styles/theme";
import { useTabNavigation } from "react-native-paper-tabs";
import { regexEmail, regexPassword } from "../../../utils/regex";

type UserCredentialFormProps = {
  newUser: NewUserProps;
  setNewUser: (newUser: NewUserProps) => void;
};

type FormDataProps = {
  email: string;
  password: string;
  confirmPassword: string;
};
function UserCredentialForm({ newUser, setNewUser }: UserCredentialFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormDataProps>();

  const goTo = useTabNavigation();

  const submit = handleSubmit((data) => {
    setNewUser({ ...newUser, email: data.email, password: data.password });
    goTo(2);
  });

  return (
    <View style={styles.container}>
      <View style={styles.contentInputs}>
        <View style={styles.input}>
          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label="Email"
                placeholder="example@email.com"
                value={value}
                onChangeText={onChange}
                error={errors.email ? true : false}
              />
            )}
            rules={{
              required: true,
              pattern: {
                value: regexEmail,
                message: "Insira um email válido",
              },
            }}
          />
          {errors.email && (
            <InvalidFormText
              title={errors.email.message || "Insira um email"}
            />
          )}
        </View>
        <View style={styles.input}>
          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label="Senha"
                value={value}
                onChangeText={onChange}
                autoCapitalize="none"
                error={errors.password ? true : false}
                secureTextEntry={!showPassword}
                right={
                  <TextInputPaper.Icon
                    icon={!showPassword ? "eye-off-outline" : "eye-outline"}
                    onPress={() => setShowPassword(!showPassword)}
                    color={APPTHEME.colors.primary}
                  />
                }
              />
            )}
            rules={{
              required: true,
              pattern: {
                value: regexPassword,
                message:
                  "A senha precisa de:\n 1 letra maiúscula\n 1 letra minúscula\n 1 caractere especial\n 1 número\n Ter no mínimo 8 dígitos",
              },
            }}
          />
          {errors.password && (
            <InvalidFormText
              title={errors.password.message || "Senha inválida"}
            />
          )}
        </View>
        <View style={styles.input}>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label="Confirmar senha"
                value={value}
                onChangeText={onChange}
                autoCapitalize="none"
                error={errors.confirmPassword ? true : false}
                secureTextEntry={!showPassword}
                right={
                  <TextInputPaper.Icon
                    icon={!showPassword ? "eye-off-outline" : "eye-outline"}
                    onPress={() => setShowPassword(!showPassword)}
                    color={APPTHEME.colors.primary}
                  />
                }
              />
            )}
            rules={{
              required: {
                message: "Confirmação de senha necessária",
                value: true,
              },
              validate: {
                value: () => {
                  return getValues("confirmPassword") === getValues("password");
                },
              },
            }}
          />
          {errors.confirmPassword && (
            <InvalidFormText
              title={
                errors.confirmPassword.message ||
                "Confirmação de senha inválida"
              }
            />
          )}
        </View>
      </View>
      <Button onPress={submit}>Proximo</Button>
    </View>
  );
}

export default withKeyboardAwareScrollView(UserCredentialForm);
