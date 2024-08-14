import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { AvatarText } from "../../components/AvatarText";
import { InvalidFormText } from "../../components/Form/InvalidFormText";
import { TextInput } from "../../components/TextInput";
import { APPTHEME } from "../../styles/theme";
import { NewPetProps } from "../../lib/props/NewPetProps";
import { RadioPet } from "../../components/RadioPet";
import { RadioGender } from "../../components/RadioGender";
import { Select } from "../../components/Select";
import { DatePicker } from "../../components/DatePicker";
import { Button } from "../../components/Button";
import { withKeyboardAwareScrollView } from "../../components/withKeyboardAwareScrollView";
import { maskNumberPositive } from "../../utils/masks";
import { catBreeds, dogBreeds } from "../../utils/breeds";
import { usePet } from "../../hooks/usePet";
import { StackRouterProps } from "../../routers/stack";
import { Switch } from "../../components/Switch";
import { styles } from "./styles";

type FormNewPet = {
  name: string;
  type: "cat" | "dog";
  race: string;
  gender: 'female' | 'male';  
  castrated: boolean;
  weight?: string;
  height?: string;
  birth?: Date;
};

function NewPet() {
  const [isDogBreeds, setIsDogBreeds] = useState(true);
  const [lellerPet, setLellerPet] = useState("");

  const navigation = useNavigation<StackRouterProps>();
  const { addNewPet, isPetLoading } = usePet();

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormNewPet>({ defaultValues: { type: "dog", castrated: false, gender: "male" } });

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

    const response = await addNewPet(newPet);
    if (response) {
      navigation.goBack();
    }
  });

  return (
    <View style={styles.container}>
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
        <View style={styles.contentRow}>
          <View style={styles.inputRadio}>
            <Text style={styles.title}>Espécie</Text>
            <Controller
              name="type"
              control={control}
              render={({ field: { value, onChange } }) => (
                <RadioPet
                pet={value}
                setPet={(data) => {
                  if (data === "dog") {
                    setIsDogBreeds(true);
                  } else {
                    setIsDogBreeds(false);
                  }
                  setValue("race", "");
                  onChange(data);
                }}
                />
              )}
              rules={{
                required: true,
              }}
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
        <View style={styles.input}>
          <Controller
            name="race"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                opcoes={isDogBreeds ? dogBreeds : catBreeds}
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
        <View style={styles.inputSwitch}>
          <Text style={styles.title}>É castrado?</Text>
          <Controller
            name="castrated"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Switch value={value} onChange={() => onChange(!value)} />
            )}
          />
        </View>
      </View>
      <Button onPress={submit} loading={isPetLoading}>
        Adicionar
      </Button>
    </View>
  );
}

export default withKeyboardAwareScrollView(NewPet);
