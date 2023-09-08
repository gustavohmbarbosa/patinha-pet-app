import React, { useState } from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";
import { withKeyboardAwareScrollView } from "../../components/withKeyboardAwareScrollView";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationProps, StackRouterProps } from "../../routers/stack";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { maskNumberPositive } from "../../utils/masks";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "../../components/DatePicker";
import { InvalidFormText } from "../../components/Form/InvalidFormText";
import { Select } from "../../components/Select";
import { catBreeds, dogBreeds } from "../../utils/breeds";
import { RadioPet } from "../../components/RadioPet";
import { APPTHEME } from "../../styles/theme";
import { AvatarText } from "../../components/AvatarText";
import { usePet } from "../../hooks/usePet";
import { UpdatePetProps } from "../../lib/props/UpdatePetProps";
import { useNavigation } from "@react-navigation/native";

type UpdatePetRouteProps = NativeStackScreenProps<
  StackNavigationProps,
  "UpdatePet"
>;

type FormUpdatePet = {
  name: string;
  breed: string;
  weight?: string;
  height?: string;
  birth?: Date;
};

function UpdatePet({ route }: UpdatePetRouteProps) {
  const basePet = route.params.pet;

  const navigation = useNavigation<StackRouterProps>();

  const [lellerPet, setLellerPet] = useState(basePet.name[0]);

  const { updatePet, isPetLoading } = usePet();

  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormUpdatePet>({
    defaultValues: {
      name: basePet.name,
      breed: basePet.breed,
      birth: basePet.birth ? new Date(basePet.birth) : undefined,
      height: basePet.height ? String(basePet.height) : undefined,
      weight: basePet.weight ? String(basePet.height) : undefined,
    },
  });

  const submit = handleSubmit(async (data) => {
    const pet: UpdatePetProps = {
      id: basePet.id,
      name: data.name,
      breed: data.breed,
      height: data.height ? Number(data.height) : undefined,
      weight: data.weight ? Number(data.weight) : undefined,
      birth: data.birth,
    };

    await updatePet(pet).then((response) => {
      if (response) {
        navigation.navigate("PetProfile", { pet: response });
      } else {
        navigation.goBack();
      }
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.contentInputs}>
        <AvatarText
          label={lellerPet}
          size={104}
          backgroundColor={APPTHEME.colors.primary}
        />
        <View style={styles.input}>
          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label="Nome"
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                  if (text.length > 0) {
                    setLellerPet(text[0]);
                  }
                }}
                error={errors.name ? true : false}
              />
            )}
            rules={{
              required: true,
            }}
          />
          {errors.name && <InvalidFormText title={"Informe o nome"} />}
        </View>
        <View style={styles.input}>
          <Controller
            name="breed"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                opcoes={basePet.type === "DOG" ? dogBreeds : catBreeds}
                placeholder="Raça"
                value={value}
                onChange={onChange}
                error={errors.breed ? true : false}
              />
            )}
            rules={{ required: true }}
          />
          {errors.breed && <InvalidFormText title="Informe a raça" />}
        </View>
        <View style={styles.input}>
          <Controller
            name="birth"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePicker
                defaultValue={value}
                onChange={onChange}
                placeholder="Quando nasceu?"
                maxToday
              />
            )}
          />
        </View>
        <View style={styles.contentRow}>
          <View style={styles.inputRow}>
            <Controller
              name="height"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  label="Altura (cm)"
                  value={value ? String(value) : ""}
                  onChangeText={(text) => {
                    const number = maskNumberPositive(text);
                    onChange(number !== undefined ? number : value);
                  }}
                  keyboardType="number-pad"
                  error={errors.height ? true : false}
                />
              )}
            />
          </View>
          <View style={styles.inputRow}>
            <Controller
              name="weight"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  label="Peso (Kg)"
                  value={value ? String(value) : ""}
                  onChangeText={(text) => {
                    const number = maskNumberPositive(text);
                    onChange(number !== undefined ? number : number);
                  }}
                  keyboardType="number-pad"
                  error={errors.weight ? true : false}
                />
              )}
            />
          </View>
        </View>
      </View>
      <Button onPress={submit} loading={isPetLoading}>
        Salvar
      </Button>
    </View>
  );
}

export default withKeyboardAwareScrollView(UpdatePet);
