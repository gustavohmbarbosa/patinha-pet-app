import React from "react";
import { View } from "react-native";

import { styles } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { InvalidFormText } from "../../components/Form/InvalidFormText";
import { maskCellphone } from "../../utils/masks";
import { withKeyboardAwareScrollView } from "../../components/withKeyboardAwareScrollView";

type FormDataProps = {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  celular: string;
}
function SingUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      nome: "",
      sobrenome: "",
      celular: "",
    },
  });

  const submit = handleSubmit((data) => console.log(data));

  return (
    <View style={styles.container}>
      <View style={styles.contentInputs}>
        <View style={styles.input}>
          <Controller
            name="nome"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label="Nome"
                value={value}
                onChangeText={onChange}
                error={errors.nome ? true : false}
              />
            )}
            rules={{ required: true }}
          />
          {errors.nome && <InvalidFormText title="Insira o seu nome!" />}
        </View>
        <View style={styles.input}>
          <Controller
            name="sobrenome"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label="Sobrenome"
                value={value}
                onChangeText={onChange}
                error={errors.sobrenome ? true : false}
              />
            )}
            rules={{ required: true }}
          />
          {errors.sobrenome && (
            <InvalidFormText title="Insira o seu sobrenome!" />
          )}
        </View>
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
            rules={{ required: true }}
          />
          {errors.email && (
            <InvalidFormText title="O email não é válido!" />
          )}
        </View>
        <View style={styles.input}>
          <Controller
            name="senha"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label="Senha"
                value={value}
                maxLength={12}
                onChangeText={onChange}
                error={errors.senha ? true : false}
                secureTextEntry={true}
              />
            )}
            rules={{ required: true, minLength:6 }}
          />
          {errors.senha && (
            <InvalidFormText title="Senha inválida" />
          )}
        </View>
        <Controller
          name="celular"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextInput
              label="Celular"
              placeholder="(00) 00000-0000"
              value={value}
              maxLength={15}
              onChangeText={(text) => onChange(maskCellphone(text))}
              keyboardType="phone-pad"
            />
          )}
        />
      </View>
      <Button onPress={submit}>Proximo</Button>
    </View>
  );
}

export default withKeyboardAwareScrollView(SingUp);
