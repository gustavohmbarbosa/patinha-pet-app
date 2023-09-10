import React from "react";
import { View } from "react-native";

import { styles } from "./styles";
import { Button } from "../../components/Button";
import { InvalidFormText } from "../../components/Form/InvalidFormText";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "../../components/TextInput";
import { NewUserTrackerProps } from "../../lib/props/NewUserTrackerProps";
import { useTracker } from "../../hooks/useTrackers";
import { maskNumberPositive } from "../../utils/masks";
import { useNavigation } from "@react-navigation/native";
import { withKeyboardAwareScrollView } from "../../components/withKeyboardAwareScrollView";
import { StackRouterProps } from "../../routers/stack";

function AddTrackerToUser() {
  const { addNewTracker, isTrackerLoading } = useTracker();
  const navigation = useNavigation<StackRouterProps>();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<NewUserTrackerProps>({
    defaultValues: {},
  });

  const submit = handleSubmit(async (data) => {
    await addNewTracker(data).then((boolean) => {
      if (boolean) {
        navigation.goBack();
      }
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.contentInputs}>
        <View style={styles.input}>
          <Controller
            name="code"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label="Código"
                value={value}
                onChangeText={onChange}
                error={errors.code ? true : false}
              />
            )}
            rules={{ required: true }}
          />
          {errors.code && <InvalidFormText title="Insira o código!" />}
        </View>
        <View style={styles.input}>
          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label="Senha"
                value={value}
                onChangeText={(text) => onChange(text.toUpperCase())}
                error={errors.password ? true : false}
                maxLength={6}
                autoCapitalize="characters"
              />
            )}
            rules={{
              required: true,
              maxLength: {
                value: 6,
                message: "Senha de 6 dígitos",
              },
              minLength: {
                value: 6,
                message: "Senha de 6 dígitos",
              },
            }}
          />
          {errors.password && (
            <InvalidFormText
              title={errors.password.message || "Insira a senha!"}
            />
          )}
        </View>
      </View>
      <Button onPress={submit} loading={isTrackerLoading}>
        Salvar
      </Button>
    </View>
  );
}

export default withKeyboardAwareScrollView(AddTrackerToUser);
