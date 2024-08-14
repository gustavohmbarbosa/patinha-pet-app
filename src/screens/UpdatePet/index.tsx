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
import { APPTHEME } from "../../styles/theme";
import { AvatarText } from "../../components/AvatarText";
import { usePet } from "../../hooks/usePet";
import { UpdatePetProps } from "../../lib/props/UpdatePetProps";
import { useNavigation } from "@react-navigation/native";
import { Switch } from "../../components/Switch";
import { RadioGender } from "../../components/RadioGender";

type UpdatePetRouteProps = NativeStackScreenProps<
  StackNavigationProps,
  "UpdatePet"
>;

type FormUpdatePet = {
  name: string;
  type: "cat" | "dog";
  race: string;
  gender: 'female' | 'male';
  castrated: boolean;
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
    handleSubmit,
    formState: { errors },
  } = useForm<FormUpdatePet>({
    defaultValues: {
      name: basePet.name,
      race: basePet.race,
      type: basePet.type,
      castrated: basePet.castrated,
      gender: basePet.gender,
      birth: basePet.birth ? new Date(basePet.birth) : undefined,
      height: basePet.height ? String(basePet.height) : undefined,
      weight: basePet.weight ? String(basePet.weight) : undefined,
    },
  });

  const submit = handleSubmit(async (data) => {
    const pet: UpdatePetProps = {
      ...data,
      id: basePet.id,
      height: data.height ? Number(data.height) : null,
      weight: data.weight ? Number(data.weight) : null,
      birth: data.birth ? data.birth : null,
    };

    await updatePet(pet).then((response) => {
      if (response) {
        navigation.navigate("PetProfile", { pet: response });
      }
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.contentInputs}>
        <View style={styles.contentInputs}>
          <AvatarText
            label={lellerPet}
            size={96}
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
              name="race"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  opcoes={basePet.type === "dog" ? dogBreeds : catBreeds}
                  placeholder="Raça"
                  value={value}
                  onChange={onChange}
                  error={errors.race ? true : false}
                />
              )}
              rules={{ required: true }}
            />
            {errors.race && <InvalidFormText title="Informe a raça" />}
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
        <View style={styles.contentRow}>
          
        <View>
          <Text style={styles.title}>É castrado?</Text>
          <Controller
            name="castrated"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Switch value={value} onChange={() => onChange(!value)} />
            )}
            />
        </View>
        <View style={styles.inputRadio}>
            <Text style={styles.title}>Gênero</Text>
            <Controller
              name="gender"
              control={control}
              render={({ field: { value, onChange } }) => (
                <RadioGender
                gender={value}
                setGender={onChange}
                />
              )}
              rules={{
                required: true,
              }}
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
