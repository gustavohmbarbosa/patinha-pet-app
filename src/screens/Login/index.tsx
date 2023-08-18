import { Dimensions, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { StackRouterProps } from "../../routers/stack";

import { CadastralHeader } from "../../components/CadastralHeader";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { TextInput as TextInputPaper } from "react-native-paper";
import { InvalidFormText } from "../../components/Form/InvalidFormText";

import { styles } from "./styles";
import { APPTHEME } from "../../styles/theme";
import { withKeyboardAwareScrollView } from "../../components/withKeyboardAwareScrollView";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { FooterText } from "../../components/Form/FooterText";
import { regexEmail } from "../../utils/regex";

type FormDataProps = {
  email: string;
  password: string;
};

function Login() {
  const windowHeight = Dimensions.get("window").height;
  const maxHeightHeader = Math.round(windowHeight * 0.6);

  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<StackRouterProps>();

  const { login, isUserLoading } = useAuth();

  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>();

  const submit = handleSubmit(async (data) => {
    await login(data.email, data.password);
  });
  return (
    <View style={styles.container}>
      <View style={{ maxHeight: maxHeightHeader }}>
        <CadastralHeader
          maxHeightHeader={maxHeightHeader}
          title="Login"
          subtitle="Bem vindo de volta"
        />
      </View>
      <View style={styles.content}>
        <View style={styles.form}>
          <View style={styles.input}>
            <Controller
              name="email"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  label="E-mail"
                  value={value}
                  onChangeText={onChange}
                  error={errors.email ? true : false}
                  keyboardType="email-address"
                />
              )}
              rules={{
                required: true,
                pattern: {
                  value: regexEmail,
                  message: "Insira um e-mail válido",
                },
              }}
            />
            {errors.email && (
              <InvalidFormText
                title={errors.email.message || "Informe o e-mail"}
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
              rules={{ required: true }}
            />
            {errors.password && <InvalidFormText title="Informe a senha" />}
          </View>

          <Button onPress={submit} loading={isUserLoading}>
            Login
          </Button>
        </View>

        <FooterText
          text="Primeiro acesso?"
          buttonText="Registre-se"
          onPress={() => {
            navigation.push("SignUp");
          }}
        />
      </View>
    </View>
  );
}
export default withKeyboardAwareScrollView(Login);
