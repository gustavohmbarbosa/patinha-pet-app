import { View, Text } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { AvatarText } from "../../components/AvatarText";
import { InvalidFormText } from "../../components/Form/InvalidFormText";
import { TextInput } from "../../components/TextInput";
import { styles } from "./styles";
import { APPTHEME } from "../../styles/theme";
import { NewPetProps } from "../../lib/props/NewPetProps";
import { RadioPet } from "../../components/RadioPet";
import { Select } from "../../components/Select";
import { DatePicker } from "../../components/DatePicker";
import { Button } from "../../components/Button";
import { withKeyboardAwareScrollView } from "../../components/withKeyboardAwareScrollView";
import { maskNumberPositive } from "../../utils/masks";
import { useState } from "react";
import { catBreeds, dogBreeds } from "../../utils/breeds";
import { usePet } from "../../hooks/usePet";
import { useNavigation } from "@react-navigation/native";
import { StackRouterProps } from "../../routers/stack";

type FormNewPet = {
  name: string;
  type: "CAT" | "DOG";
  breed: string;
  weight?: string;
  height?: string;
  birth?: Date;
};

function NewPet() {
  const [isDogBreeds, setIsDogBreeds] = useState(true);

  const navigation = useNavigation<StackRouterProps>();
  const { addNewPet, isPetLoading } = usePet();

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormNewPet>({ defaultValues: { type: "DOG" } });

  const submit = handleSubmit(async (data) => {
    const newPet: NewPetProps = {
      ...data,
      height:
        data.height !== undefined && data.height !== ""
          ? Number(data.height)
          : undefined,
      weight:
        data.weight !== undefined && data.weight !== ""
          ? Number(data.weight)
          : undefined,
    };

    await addNewPet(newPet).then(() => {
      navigation.goBack();
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.contentInputs}>
        <AvatarText
          label="N"
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
                onChangeText={onChange}
                error={errors.name ? true : false}
              />
            )}
            rules={{
              required: true,
            }}
          />
          {errors.name && <InvalidFormText title={"Informe o nome"} />}
        </View>
        <View style={styles.inputRadio}>
          <Text style={styles.title}>Espécie</Text>
          <Controller
            name="type"
            control={control}
            render={({ field: { value, onChange } }) => (
              <RadioPet
                pet={value}
                setPet={(data) => {
                  if (data === "DOG") {
                    setIsDogBreeds(true);
                  } else {
                    setIsDogBreeds(false);
                  }
                  setValue("breed", "");
                  onChange(data);
                }}
              />
            )}
            rules={{
              required: true,
            }}
          />
        </View>
        <View style={styles.input}>
          <Controller
            name="breed"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                opcoes={isDogBreeds ? dogBreeds : catBreeds}
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
              <DatePicker onChange={onChange} placeholder="Quando nasceu?" />
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
        Adicionar
      </Button>
    </View>
  );
}

export default withKeyboardAwareScrollView(NewPet);
