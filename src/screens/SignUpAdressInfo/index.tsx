import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { ButtonOutline } from "../../components/ButtonOutline";
import { TextInput } from "../../components/TextInput";
import { TextInput as TextInputPaper } from "react-native-paper";
import { InvalidFormText } from "../../components/Form/InvalidFormText";
import { Select } from "../../components/Select";

import { getCep } from "../../services/getCep";
import { cepInfoProps } from "../../lib/types";
import { APPTHEME } from "../../styles/theme";
import { styles } from "./styles";
import { withKeyboardAwareScrollView } from "../../components/withKeyboardAwareScrollView";
import { maskCep } from "../../utils/masks";
import { listUF } from "../../utils/uf";

type FormDataProps = {
  cep: string;
  uf: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  numero: string;
  complemento: string;
};

function SignUpAdressInfo() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    clearErrors,
    setError,
  } = useForm<FormDataProps>({
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

  const submit = handleSubmit((data) => console.log(data));

  const [validateOnSubmit, setValidateOnSubmit] = useState(true);

  async function handleGetCep() {
    const cep = getValues("cep");
    if (cep.length === 9) {
      try {
        const cepInfo: cepInfoProps = await getCep(cep);

        setValue("cidade", cepInfo.localidade);
        setValue("uf", cepInfo.uf);
        setValue("bairro", cepInfo.bairro);
        setValue("logradouro", cepInfo.logradouro);
        setValue("complemento", cepInfo.complemento);

        clearErrors();
      } catch (error) {
        setError("cep", { message: "Cep não encontrado" });
      }
    }
  }

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
                maxLength={9}
                onChangeText={(text) => {
                  onChange(maskCep(text));
                  handleGetCep();
                }}
                keyboardType="number-pad"
                right={
                  <TextInputPaper.Icon
                    icon="magnify"
                    color={
                      errors.cep
                        ? APPTHEME.colors.alert
                        : APPTHEME.colors.primary
                    }
                  />
                }
                error={errors.cep ? true : false}
              />
            )}
            rules={{ required: true }}
          />
          {errors.cep && (
            <InvalidFormText
              title={errors.cep.message || "Informe um Cep válido"}
            />
          )}
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
              <InvalidFormText title="Informe a cidade" />
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
              <InvalidFormText title="Informe a UF" />
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
          {errors.bairro && <InvalidFormText title="Informe o bairro" />}
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
            <InvalidFormText title="Informe o logradouro" />
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
            />
          </View>
        </View>
      </View>
      <View>
        <Button
          onPress={() => {
            submit();
            setValidateOnSubmit(true);
          }}
        >
          Criar conta
        </Button>
        <ButtonOutline
          onPress={() => {
            submit();
            setValidateOnSubmit(false);
          }}
        >
          Preencher depois
        </ButtonOutline>
      </View>
    </View>
  );
}

export default withKeyboardAwareScrollView(SignUpAdressInfo);
