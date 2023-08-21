import React from "react";
import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { TextInput as TextInputPaper } from "react-native-paper";
import { Button } from "../../../components/Button";
import { TextInput } from "../../../components/TextInput";
import { InvalidFormText } from "../../../components/Form/InvalidFormText";
import { Select } from "../../../components/Select";
import { withKeyboardAwareScrollView } from "../../../components/withKeyboardAwareScrollView";
import {
  NewAddressUserProps,
  NewUserProps,
} from "../../../lib/props/NewUserProps";
import { cepInfoProps } from "../../../lib/types";

import { getCep } from "../../../services/getCep";
import { maskCep, removeMask } from "../../../utils/masks";
import { styles } from "./styles";
import { APPTHEME } from "../../../styles/theme";
import { listUF } from "../../../utils/uf";
import { useAuth } from "../../../hooks/useAuth";
import { FooterText } from "../../../components/Form/FooterText";

type AddressFormProps = {
  newUser: NewUserProps;
};

function AddressForm({ newUser }: AddressFormProps) {
  const { signUp, isUserLoading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    clearErrors,
    setError,
  } = useForm<NewAddressUserProps>();

  const submit = handleSubmit((data) => {
    const cepNoMask = removeMask(data.zipCode);

    signUp({
      ...newUser,
      address: {
        zipCode: cepNoMask,
        city: data.city,
        state: data.state,
        neighborhood: data.neighborhood,
        street: data.street,
        complement: data.complement === "" ? undefined : data.complement,
        number: data.number === "" ? undefined : data.number,
      },
    });
  });

  const submitWithoutAdress = () => {
    signUp({ ...newUser, address: null });
  };

  async function handleGetCep() {
    const cep = getValues("zipCode");
    if (cep.length === 9) {
      try {
        const cepInfo: cepInfoProps = await getCep(cep);

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
                    onPress={handleGetCep}
                  />
                }
                error={errors.zipCode ? true : false}
              />
            )}
            rules={{
              required: { value: true, message: "Informe o cep" },
              validate: () => {
                const zipCode = getValues("zipCode");
                return zipCode.length === 9;
              },
            }}
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
                  value={value}
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
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonFooterContent}>
        <Button onPress={submit} loading={isUserLoading}>
          Criar conta
        </Button>
        <FooterText
          buttonText="Criar conta sem endereço"
          buttonTextStyle={styles.buttonFooter}
          text=""
          onPress={submitWithoutAdress}
          disabled={isUserLoading}
        />
      </View>
    </View>
  );
}

export default withKeyboardAwareScrollView(AddressForm);
