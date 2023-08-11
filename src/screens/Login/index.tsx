import { Text, TouchableOpacity, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { StackRouterProps } from "../../routers/stack";

import { CadastralHeader } from "../../components/CadastralHeader";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { TextInput as TextInputPaper } from "react-native-paper";
import { InvalidFormText } from "../../components/Form/InvalidFormText";

import EyeImg from "../../assets/eye-off.svg";
import { styles } from "./styles";
import { APPTHEME } from "../../styles/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { withKeyboardAwareScrollView } from "../../components/withKeyboardAwareScrollView";
import { useState } from "react";

type FormDataProps = {
  email: string;
  password: string;
};

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<StackRouterProps>();

  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>();

  const submit = handleSubmit((data) => {
    console.log(data);
    navigation.push("Home");
  });
  return (
    <View style={styles.container}>
      <CadastralHeader />
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
                // aqui coloca todos as regras do input, se é obrigatório, tamanho, etc
                // se nn tiver nenhuma regra, só tirar esse atributo
                required: true,
              }}
            />
            {errors.email && <InvalidFormText title="Email necessário!" />}
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
              rules={{ required: true }}
            />
            {errors.password && <InvalidFormText title="Senha necessária!" />}
          </View>

          <Button onPress={submit}>Submit</Button>
        </View>

        <View style={styles.foot}>
          <Text style={styles.footTitle}>Primeiro acesso?</Text>
          <TouchableOpacity style={styles.footButton} activeOpacity={0.6}>
            <Text style={styles.secondary}>Registre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default withKeyboardAwareScrollView(Login);
