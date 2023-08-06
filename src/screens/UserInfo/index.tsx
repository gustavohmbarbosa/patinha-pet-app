import React from "react";
import { View } from "react-native";

import { styles } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { InvalidFormText } from "../../components/Form/InvalidFormText";
import { maskCellphone } from "../../utils/masks";

// faz a tipagem dos dados que terá no fomrulário
type FormDataProps = {
  nome: string;
  sobrenome: string;
  celular: string;
};

export function UserInfo() {
  // o que vai fazer o gerenciamento dos dados e entender os erros dos inputs
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    // informa os valores padrão dos campos
    defaultValues: {
      nome: "",
      sobrenome: "",
      celular: "",
    },
  });

  //função de submit do form
  // necessário usar o do handleSbumit para obter os dados e executar a lógica que deseja
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
      <Button onPress={submit}>Salvar</Button>
    </View>
  );
}
