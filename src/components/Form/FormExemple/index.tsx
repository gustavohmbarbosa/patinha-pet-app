import { View } from "react-native";

import { styles } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "../../TextInput";
import { Button } from "../../Button";
import { InvalidFormText } from "../InvalidFormText";
import { maskCellphone } from "../../../utils/masks";

// faz a tipagem dos dados que terá no fomrulário
type FormDataProps = {
  nome: string;
  telefone: string;
};

export function FormExemple() {
  // o que vai fazer o gerenciamento dos dados e entender os erros dos inputs
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    // informa os valores padrão dos campos
    defaultValues: {
      nome: "",
      telefone: "",
    },
  });

  //função de submit do form
  // necessário usar o do handleSbumit para obter os dados e executar a lógica que deseja
  const submit = handleSubmit((data) => console.log(data));
  return (
    <View style={styles.container}>
      {/* Cada campo deve ter um controller que gerencia o input
       */}
      <Controller
        name="nome"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextInput
            label="Seu nome"
            value={value}
            onChangeText={onChange}
            error={errors.nome ? true : false}
          />
        )}
        rules={{
          // aqui coloca todos as regras do input, se é obrigatório, tamanho, etc
          // se nn tiver nenhuma regra, só tirar esse atributo
          required: true,
        }}
      />
      {errors.nome && <InvalidFormText title="This is required" />}

      {/* Exemplo com máscara */}
      <Controller
        name="telefone"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextInput
            label="Telefone"
            value={value}
            // define o tamanho máximo(contando com os itens da máscara)
            maxLength={15}
            // necessário validar o texto inserido antes de atualizar seu valor
            onChangeText={(text) => {
              // pega o texto atual do input e passa na função de máscara
              const value = maskCellphone(text);
              // o retorno já está fomratado
              // passa pra função do hook form pra fazer a atualização do valor
              onChange(value);
            }}
            // mudando o teclado do usuário
            keyboardType="phone-pad"
          />
        )}
      />

      <Button onPress={submit}>Submit</Button>
    </View>
  );
}
