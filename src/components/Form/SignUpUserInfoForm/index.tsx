import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { styles } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../Button";
import { TextInput } from "../../TextInput";
import { TextInput as TextInputPaper } from "react-native-paper";
import { InvalidFormText } from "../InvalidFormText";
import { maskCellphone } from "../../../utils/masks";
import { withKeyboardAwareScrollView } from "../../withKeyboardAwareScrollView";
import { NewUserProps } from "../../../lib/props/NewUserProps";
import { APPTHEME } from "../../../styles/theme";
import { useTabNavigation } from "react-native-paper-tabs";

type SingUpUserInfoFormProps = {
  newUser: NewUserProps;
  setNewUser: (newUser: NewUserProps) => void;
  setAddressDisabled: (value: boolean) => void;
};

type FormDataProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
};
function SingUpUserInfoForm({
  newUser,
  setNewUser,
  setAddressDisabled,
}: SingUpUserInfoFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      phone: "",
    },
  });

  const goTo = useTabNavigation();

  const submit = handleSubmit(() => {
    setAddressDisabled(false);
    goTo(1);
  });

  return (
    <View style={styles.container}>
      <View style={styles.contentInputs}>
        <View style={styles.input}>
          <Controller
            name="firstName"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label="Nome"
                value={value}
                onChangeText={(text) => {
                  setNewUser({ ...newUser, firstName: text });
                  onChange(text);
                }}
                error={errors.firstName ? true : false}
              />
            )}
            rules={{ required: true }}
          />
          {errors.firstName && <InvalidFormText title="Insira o seu nome!" />}
        </View>
        <View style={styles.input}>
          <Controller
            name="lastName"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label="Sobrenome"
                value={value}
                onChangeText={(text) => {
                  setNewUser({ ...newUser, lastName: text });
                  onChange(text);
                }}
                error={errors.lastName ? true : false}
              />
            )}
            rules={{ required: true }}
          />
          {errors.lastName && (
            <InvalidFormText title="Insira o seu sobrenome!" />
          )}
        </View>
        <Controller
          name="phone"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextInput
              label="Celular"
              placeholder="(00) 00000-0000"
              value={value}
              maxLength={15}
              onChangeText={(text) => {
                setNewUser({ ...newUser, phone: text });
                onChange(maskCellphone(text));
              }}
              keyboardType="phone-pad"
            />
          )}
        />
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
      </View>
      <Button onPress={submit}>Proximo</Button>
    </View>
  );
}

export default withKeyboardAwareScrollView(SingUpUserInfoForm);
