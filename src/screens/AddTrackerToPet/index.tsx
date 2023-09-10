import { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { usePet } from "../../hooks/usePet";
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

import { PetProps } from "../../lib/props/PetProps";
import { TrackerProps } from "../../lib/props/TrackerProps";
import { styles } from "./styles";

type FormAddTrackerToPetProps = {
  code: string;
  password: string;
  pet: PetProps;
  tracker: TrackerProps;
};

type AddTrackerToPetProps = NativeStackScreenProps<
  StackNavigationProps,
  "AddTrackerToPet"
>;

function AddTrackerToPet({ route }: AddTrackerToPetProps) {
  const [isNewTracker, setIsNewTracker] = useState(false);
  const [trackerSelect, setTrackerSelect] = useState<TrackerProps>(
    {} as TrackerProps
  );
  const [petSelected, setPetSelected] = useState<PetProps>(route.params.pet);
  const { pets } = usePet();
  const { addNewTracker, addTrackerToPet, trackers, isTrackerLoading } =
    useTracker();

  const navigation = useNavigation<StackRouterProps>();

  const {
    control,
    handleSubmit,
    resetField,
    clearErrors,
    formState: { errors },
  } = useForm<FormAddTrackerToPetProps>({
    defaultValues: {
      pet: route.params.pet,
    },
  });

  const submit = handleSubmit(async (data) => {
    if (isNewTracker) {
      await addNewTracker({ code: data.code, password: data.password }).then(
        async (trackerId) => {
          if (trackerId) {
            await addTrackerToPet(data.pet.id, trackerId).then((response) => {
              if (response) {
                Alert.alert("Deu certo");
                navigation.goBack();
              }
            });
          }
        }
      );
    } else {
      await addTrackerToPet(data.pet.id, data.tracker.id).then((response) => {
        if (response) {
          navigation.goBack();
        }
      });
    }
  });

  useEffect(() => {
    if (trackers.length === 0) {
      setIsNewTracker(true);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentInputs}>
        <View style={styles.input}>
          <Controller
            name="pet"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                opcoes={pets}
                placeholder="Pet"
                value={petSelected}
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
                value={trackerSelect}
                onChange={(item) => {
                  setTrackerSelect(item);
                  onChange(item);
                }}
                error={errors.tracker ? true : false}
                disabled={isNewTracker}
              />
            )}
            rules={{ required: !isNewTracker }}
          />
          {errors.tracker && (
            <InvalidFormText
              title={errors.tracker.message || "Selecione um rastreador"}
            />
          )}
          {trackers.length === 0 && (
            <InvalidFormText title={"Você não possui rastreador"} />
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
                if (newValue) {
                  resetField("tracker");
                }
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
