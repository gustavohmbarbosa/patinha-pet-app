import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "../../components/Button";
import { InvalidFormText } from "../../components/Form/InvalidFormText";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "../../components/TextInput";
import { useTracker } from "../../hooks/useTrackers";
import { useNavigation } from "@react-navigation/native";
import { withKeyboardAwareScrollView } from "../../components/withKeyboardAwareScrollView";
import { StackNavigationProps, StackRouterProps } from "../../routers/stack";
import { Select } from "../../components/Select";
import { Switch } from "../../components/Switch";

import { styles } from "./styles";
import { PetProps } from "../../lib/props/PetProps";
import { TrackerProps } from "../../lib/props/TrackerProps";
import { useEffect, useState } from "react";

type FormAddTrackerToPetProps = {
  code: string;
  password: string;
  Pet: PetProps;
  tracker: TrackerProps;
};

type AddTrackerToPetProps = NativeStackScreenProps<
  StackNavigationProps,
  "AddTrackerToPet"
>;

function AddTrackerToPet({ route }: AddTrackerToPetProps) {
  const [isNewTracker, setIsNewTracker] = useState(false);

  const { addNewTracker, trackers, isTrackerLoading } = useTracker();
  const navigation = useNavigation<StackRouterProps>();

  const {
    control,
    handleSubmit,
    getValues,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<FormAddTrackerToPetProps>({
    defaultValues: {},
  });

  const submit = handleSubmit(async (data) => {
    // await addNewTracker(data).then((boolean) => {
    //   if (boolean) {
    //     navigation.goBack();
    //   }
    // });
  });

  useEffect(() => {
    if (trackers.length === 0) {
      setIsNewTracker(true);
      setError("tracker", {
        type: "value",
        message: "Você não possui rastreador",
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentInputs}>
        <View style={styles.input}>
          <Controller
            name="Pet"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                opcoes={[route.params.pet]}
                placeholder="Pet"
                value={route.params.pet}
                onChange={onChange}
                disabled
              />
            )}
            rules={{ required: true }}
          />
        </View>
        <View style={styles.input}>
          <Controller
            name="tracker"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                opcoes={trackers}
                placeholder={
                  trackers.length > 0 ? "Rastreador" : "Sem rastreador"
                }
                value={value}
                onChange={onChange}
                disabled={isNewTracker}
              />
            )}
          />
          {errors.tracker && (
            <InvalidFormText
              title={errors.tracker.message || "Selecione um rastreador"}
            />
          )}
        </View>
        <View style={styles.inputSwitch}>
          <Text>Novo rastreador?</Text>
          <Switch
            value={isNewTracker}
            onValueChange={(newValue) => {
              if (trackers.length > 0) {
                setIsNewTracker(newValue);
                clearErrors("tracker");
              }
            }}
          />
        </View>
        {isNewTracker && (
          <>
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
                rules={{ required: isNewTracker }}
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
                  required: isNewTracker,
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
          </>
        )}
      </View>
      <Button onPress={submit} loading={isTrackerLoading}>
        Salvar
      </Button>
    </View>
  );
}

export default withKeyboardAwareScrollView(AddTrackerToPet);
