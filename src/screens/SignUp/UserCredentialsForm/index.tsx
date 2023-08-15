import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { styles } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../../components/Button";
import { TextInput } from "../../../components/TextInput";
import { TextInput as TextInputPaper } from "react-native-paper";
import { InvalidFormText } from "../../../components/Form/InvalidFormText";
import { maskCellphone } from "../../../utils/masks";
import { withKeyboardAwareScrollView } from "../../../components/withKeyboardAwareScrollView";
import { NewUserProps } from "../../../lib/props/NewUserProps";
import { APPTHEME } from "../../../styles/theme";
import { useTabNavigation } from "react-native-paper-tabs";

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
    formState: { errors },
  } = useForm<FormDataProps>();

  const goTo = useTabNavigation();

  const submit = handleSubmit(() => {
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
                onChangeText={(text) => {
                  setNewUser({ ...newUser, email: text });
                  onChange(text);
                }}
                error={errors.email ? true : false}
              />
            )}
            rules={{ required: true }}
          />
          {errors.email && <InvalidFormText title="O email não é válido!" />}
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
            rules={{ required: true, minLength: 6 }}
          />
          {errors.password && <InvalidFormText title="Senha inválida" />}
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
