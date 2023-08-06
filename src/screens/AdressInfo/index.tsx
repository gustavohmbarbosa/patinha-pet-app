import React from "react";
import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { InvalidFormText } from "../../components/Form/InvalidFormText";
import { Select } from "../../components/Select";

import { listUF } from "../../utils/uf";
import { styles } from "./styles";
import { maskCep } from "../../utils/masks";

type FormDataProps = {
  cep: string;
  uf: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  numero: string;
  complemento: string;
};

export function AdressInfo() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    // informa os valores padrão dos campos
    defaultValues: {
      cep: "",
      uf: "",
      cidade: "",
      bairro: "",
      logradouro: "",
      numero: "",
      complemento: "",
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
            name="cep"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label="CEP"
                value={value}
                // tamanho máximo com a máscara
                maxLength={9}
                // adicionando a mask do cep, necessário passar uma função por fora
                onChangeText={(text) => {
                  const value = maskCep(text);
                  onChange(value);
                }}
                keyboardType="number-pad"
                error={errors.cep ? true : false}
              />
            )}
            rules={{ required: true }}
          />
          {errors.cep && <InvalidFormText title="Insira o Cep!" />}
        </View>
        <View style={styles.ContentRow}>
          <View style={styles.large}>
            <Controller
              name="cidade"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  label="Cidade"
                  value={value}
                  onChangeText={onChange}
                  error={errors.cidade ? true : false}
                />
              )}
              rules={{ required: true }}
            />
            {errors.cidade ? (
              <InvalidFormText title="Insira a cidade!" />
            ) : errors.uf ? (
              <View style={styles.box} />
            ) : (
              <></>
            )}
          </View>
          <View style={styles.small}>
            <Controller
              name="uf"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  opcoes={listUF}
                  placeholder="UF"
                  value={value}
                  onChange={onChange}
                  error={errors.uf ? true : false}
                />
              )}
              rules={{ required: true }}
            />
            {errors.uf ? (
              <InvalidFormText title="Insira a UF!" />
            ) : errors.cidade ? (
              <View style={styles.box} />
            ) : (
              <></>
            )}
          </View>
        </View>
        <View style={styles.input}>
          <Controller
            name="bairro"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label="Bairro"
                value={value}
                onChangeText={onChange}
                error={errors.bairro ? true : false}
              />
            )}
            rules={{ required: true }}
          />
          {errors.bairro && <InvalidFormText title="Insira o bairro!" />}
        </View>
        <View style={styles.input}>
          <Controller
            name="logradouro"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label="Logradouro"
                value={value}
                onChangeText={onChange}
                error={errors.logradouro ? true : false}
              />
            )}
            rules={{ required: true }}
          />
          {errors.logradouro && (
            <InvalidFormText title="Insira o logradouro!" />
          )}
        </View>
        <View style={styles.ContentRow}>
          <View style={styles.small}>
            <Controller
              name="numero"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  label="Número"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              // não é obrigatório
              // rules={{ required: true }}
            />
          </View>
          <View style={styles.large}>
            <Controller
              name="complemento"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  label="Complemento"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              // não é obrigatório
              // rules={{ required: true }}
            />
          </View>
        </View>
        <View style={styles.large}>
          <Controller
            name="complemento"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label="Complemento"
                value={value}
                onChangeText={onChange}
              />
            )}
            // não é obrigatório
            // rules={{ required: true }}
          />
        </View>
      </View>
      <Button onPress={submit}>Salvar</Button>
    </View>
  );
}
