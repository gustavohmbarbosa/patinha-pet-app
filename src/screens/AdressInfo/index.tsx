import React from "react";
import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { TextInput as TextInputPaper } from "react-native-paper";
import { InvalidFormText } from "../../components/Form/InvalidFormText";
import { Select } from "../../components/Select";

import { listUF } from "../../utils/uf";
import { maskCep, removeMask } from "../../utils/masks";
import { styles } from "./styles";
import { getCep } from "../../services/getCep";
import { cepInfoProps } from "../../lib/types";
import { APPTHEME } from "../../styles/theme";
import { withKeyboardAwareScrollView } from "../../components/withKeyboardAwareScrollView";
import { UpdateUserAddressProps } from "../../lib/props/UpdateUserProps";
import { useAuth } from "../../hooks/useAuth";

function AdressInfo() {
  const { user, updateUserAddress, isUserLoading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    clearErrors,
    setError,
  } = useForm<UpdateUserAddressProps>({
    defaultValues: {
      zipCode: user.user.address.zipCode || "",
      city: user.user.address.city || "",
      state: user.user.address.state || "",
      neighborhood: user.user.address.neighborhood || "",
      street: user.user.address.street || "",
      number: user.user.address.number,
      complement: user.user.address.complement,
    },
  });

  async function handleGetCep() {
    const zipCode = getValues("zipCode");
    if (zipCode.length === 9) {
      try {
        const cepInfo: cepInfoProps = await getCep(zipCode);

        setValue("city", cepInfo.localidade);
        setValue("state", cepInfo.uf);
        setValue("neighborhood", cepInfo.bairro);
        setValue("street", cepInfo.logradouro);
        setValue("complement", cepInfo.complemento);

        clearErrors();
      } catch (error) {
        setError("zipCode", { message: "Cep não encontrado" });
      }
    }
  }

  const submit = handleSubmit(async (data) => {
    const zipCode = removeMask(data.zipCode);

    await updateUserAddress({
      ...data,
      zipCode: zipCode,
      number: data.number === "" ? null : data.number,
      complement: data.complement === "" ? null : data.complement,
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.contentInputs}>
        <View style={styles.input}>
          <Controller
            name="zipCode"
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
                      errors.zipCode
                        ? APPTHEME.colors.alert
                        : APPTHEME.colors.primary
                    }
                  />
                }
                error={errors.zipCode ? true : false}
              />
            )}
            rules={{ required: true }}
          />
          {errors.zipCode && (
            <InvalidFormText
              title={errors.zipCode.message || "Informe um Cep válido"}
            />
          )}
        </View>
        <View style={styles.ContentRow}>
          <View style={styles.large}>
            <Controller
              name="city"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  label="Cidade"
                  value={value}
                  onChangeText={onChange}
                  error={errors.city ? true : false}
                />
              )}
              rules={{ required: true }}
            />
            {errors.city ? (
              <InvalidFormText title="Informe a cidade" />
            ) : errors.state ? (
              <View style={styles.box} />
            ) : (
              <></>
            )}
          </View>
          <View style={styles.small}>
            <Controller
              name="state"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  opcoes={listUF}
                  placeholder="UF"
                  value={value}
                  onChange={onChange}
                  error={errors.state ? true : false}
                />
              )}
              rules={{ required: true }}
            />
            {errors.state ? (
              <InvalidFormText title="Informe a UF" />
            ) : errors.city ? (
              <View style={styles.box} />
            ) : (
              <></>
            )}
          </View>
        </View>
        <View style={styles.input}>
          <Controller
            name="neighborhood"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label="Bairro"
                value={value}
                onChangeText={onChange}
                error={errors.neighborhood ? true : false}
              />
            )}
            rules={{ required: true }}
          />
          {errors.neighborhood && <InvalidFormText title="Informe o bairro" />}
        </View>
        <View style={styles.input}>
          <Controller
            name="street"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label="Logradouro"
                value={value}
                onChangeText={onChange}
                error={errors.street ? true : false}
              />
            )}
            rules={{ required: true }}
          />
          {errors.street && <InvalidFormText title="Informe o logradouro" />}
        </View>
        <View style={styles.ContentRow}>
          <View style={styles.small}>
            <Controller
              name="number"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  label="Número"
                  value={value ? value : ""}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          <View style={styles.large}>
            <Controller
              name="complement"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  label="Complemento"
                  value={value ? value : ""}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
        </View>
      </View>
      <Button onPress={submit} loading={isUserLoading}>
        Salvar
      </Button>
    </View>
  );
}

export default withKeyboardAwareScrollView(AdressInfo);
