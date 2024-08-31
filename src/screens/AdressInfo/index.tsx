import React, { useEffect, useState } from "react";
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
import { Loading } from "../../components/Loading";
import { useNavigation } from "@react-navigation/native";

function AdressInfo() {
  const [isInfoLoading, setIsInfoLoading] = useState(true);
  const { updateUserAddress, getInfo, isUserLoading } = useAuth();
  const navigate = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    clearErrors,
    setError,
  } = useForm<UpdateUserAddressProps>();

  async function handleGetCep() {
    const cep = getValues("cep");
    if (cep.length === 9) {
      try {
        const cepInfo: cepInfoProps = await getCep(cep);

        setValue("city", cepInfo.localidade);
        setValue("state", cepInfo.uf);
        setValue("district", cepInfo.bairro);
        setValue("street", cepInfo.logradouro);
        setValue("complement", cepInfo.complemento);

        clearErrors();
      } catch (error) {
        setError("cep", { message: "Cep não encontrado" });
      }
    }
  }

  const submit = handleSubmit(async (data) => {
    const cep = removeMask(data.cep);

    const success = await updateUserAddress({
      ...data,
      cep: cep,
      number: data.number === "" ? undefined : data.number,
      complement: data.complement === "" ? undefined : data.complement,
    });

    if (success) navigate.goBack();
  });

  async function getUserInfo() {
    setIsInfoLoading(true);
    const user = await getInfo();

    if (user && user.address) {
      if (user.address.city) setValue("city", user.address.city);
      if (user.address.state) setValue("state", user.address.state);
      if (user.address.cep) setValue("cep", user.address.cep);
      if (user.address.district) setValue("district", user.address.district);
      if (user.address.street) setValue("street", user.address.street);
      if (user.address.complement)
        setValue("complement", user.address.complement);
      if (user.address.number) setValue("number", user.address.number);
    }

    setIsInfoLoading(false);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      {isInfoLoading ? (
        <Loading />
      ) : (
        <>
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
                name="district"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    label="Bairro"
                    value={value}
                    onChangeText={onChange}
                    error={errors.district ? true : false}
                  />
                )}
                rules={{ required: true }}
              />
              {errors.district && <InvalidFormText title="Informe o bairro" />}
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
              {errors.street && (
                <InvalidFormText title="Informe o logradouro" />
              )}
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
        </>
      )}
    </View>
  );
}

export default withKeyboardAwareScrollView(AdressInfo);
