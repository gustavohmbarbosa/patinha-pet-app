import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "../../components/TextInput";
import { DatePicker } from "../../components/DatePicker";
import { Select } from "../../components/Select";
import { NewVaccineDoseProps } from "../../lib/props/NewVaccineDoseProps";
import { Button } from "../../components/Button";
import { withKeyboardAwareScrollView } from "../../components/withKeyboardAwareScrollView";
import { Switch } from "../../components/Switch";
import { InvalidFormText } from "../../components/Form/InvalidFormText";
import { usePet } from "../../hooks/usePet";
import { PetProps } from "../../lib/props/PetProps";
import { VaccineProps } from "../../lib/props/VaccineProps";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProps, StackRouterProps } from "../../routers/stack";
import { styles } from "./styles";
import { maskNumberPositive } from "../../utils/masks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type addVaccineDoseForm = {
  vaccine: VaccineProps;
  scheduledDate: Date;
  pet: PetProps;
  vaccinatedDate?: Date;
  locale?: string;
  batch?: string;
  brand?: string;
  professional?: string;
  observation?: string;
};

type NewVaccineDoseRouterProps = NativeStackScreenProps<
  StackNavigationProps,
  "NewVaccineDose"
>;

function NewVaccineDose({ route }: NewVaccineDoseRouterProps) {
  const basePet = route.params?.pet;

  const {
    control,
    resetField,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<addVaccineDoseForm>({
    defaultValues: {
      pet: basePet,
    },
  });

  const [additionalInfo, setAdditionalInfo] = useState(false);
  const [isDog, setIsDog] = useState(true);
  const [petSelect, setPetSelect] = useState<PetProps>(
    basePet ? basePet : ({} as PetProps)
  );
  const [vaccineSelect, setVaccineSelect] = useState<VaccineProps>(
    {} as VaccineProps
  );

  const { pets, dogVaccines, catVaccines, addVaccineToPet, isPetLoading } =
    usePet();

  const navigation = useNavigation<StackRouterProps>();

  const submit = handleSubmit(async (data) => {
    if (additionalInfo && !data.vaccinatedDate) {
      setError("vaccinatedDate", {
        message: "Insira a data de vacinação",
        type: "required",
      });
      return;
    }

    var newVaccineDose: NewVaccineDoseProps = {} as NewVaccineDoseProps;
    if (!additionalInfo) {
      newVaccineDose = {
        scheduledDate: data.scheduledDate,
      };
    } else {
      newVaccineDose = {
        scheduledDate: data.scheduledDate,
        vaccinatedDate: data.vaccinatedDate,
        batch: data.batch,
        brand: data.brand,
        locale: data.locale,
        observation: data.observation,
        professional: data.professional,
      };
    }
    await addVaccineToPet(petSelect.id, vaccineSelect.id, newVaccineDose).then(
      () => {
        navigation.goBack();
      }
    );
  });

  useEffect(() => {
    if (petSelect.type === "DOG") {
      setIsDog(true);
    } else {
      setIsDog(false);
    }
  }, [petSelect]);

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
                placeholder="Pet a ser vacinado"
                value={petSelect}
                onChange={(item: PetProps) => {
                  if (petSelect.type !== item.type) {
                    resetField("vaccine");
                  }

                  setPetSelect(item);
                  onChange(item);
                }}
                disabled={basePet ? true : false}
                error={errors.pet ? true : false}
              />
            )}
            rules={{
              required: true,
            }}
          />
          {errors.pet && (
            <InvalidFormText title={errors.pet.message || "Selecione o Pet"} />
          )}
        </View>
        <View style={styles.input}>
          <Controller
            name="vaccine"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                opcoes={isDog ? dogVaccines : catVaccines}
                placeholder="Vacina"
                value={vaccineSelect}
                onChange={(item) => {
                  setVaccineSelect(item);
                  onChange(item);
                }}
                error={errors.vaccine ? true : false}
              />
            )}
            rules={{
              required: true,
            }}
          />
          {errors.vaccine && (
            <InvalidFormText
              title={errors.vaccine.message || "Informe a vacina"}
            />
          )}
        </View>
        <View style={styles.input}>
          <Controller
            name="scheduledDate"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePicker
                onChange={(date) => {
                  clearErrors("scheduledDate");
                  onChange(date);
                }}
                error={errors.scheduledDate ? true : false}
                placeholder="Data marcada"
              />
            )}
            rules={{
              required: true,
            }}
          />
          {errors.scheduledDate && (
            <InvalidFormText
              title={
                errors.scheduledDate.message ||
                "Informe o data que será vacinado"
              }
            />
          )}
        </View>
        <View style={styles.inputSwitch}>
          <Text>Vacinado?</Text>
          <Switch
            value={additionalInfo}
            onValueChange={(newValue) => {
              setAdditionalInfo(newValue);
            }}
          />
        </View>
        {additionalInfo && (
          <>
            <View style={styles.input}>
              <Controller
                name="vaccinatedDate"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    onChange={(date) => {
                      clearErrors("vaccinatedDate");
                      onChange(date);
                    }}
                    placeholder="Data de vacinação"
                    error={errors.vaccinatedDate ? true : false}
                  />
                )}
              />
              {errors.vaccinatedDate && (
                <InvalidFormText
                  title={
                    errors.vaccinatedDate.message ||
                    "Insira da data de vacinação"
                  }
                />
              )}
            </View>
            <View style={styles.input}>
              <Controller
                name="locale"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    label="Local de Vacinação"
                    placeholder="Local de Vacinação"
                    value={value as string}
                    onChangeText={onChange}
                    error={errors.locale ? true : false}
                  />
                )}
              />
            </View>
            <View style={styles.input}>
              <Controller
                name="batch"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    label="Lote"
                    placeholder="Lote"
                    value={value as string}
                    onChangeText={onChange}
                    error={errors.batch ? true : false}
                  />
                )}
              />
            </View>
            <View style={styles.input}>
              <Controller
                name="brand"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    label="Marca"
                    placeholder="Marca"
                    value={value as string}
                    onChangeText={onChange}
                    error={errors.brand ? true : false}
                  />
                )}
              />
            </View>
            <View style={styles.input}>
              <Controller
                name="professional"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    label="Profissional"
                    placeholder="Profissional responsável"
                    value={value as string}
                    onChangeText={onChange}
                    error={errors.professional ? true : false}
                  />
                )}
              />
            </View>
            <View style={styles.input}>
              <Controller
                name="observation"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    label="Observações"
                    placeholder="Observações"
                    value={value as string}
                    onChangeText={onChange}
                    error={errors.observation ? true : false}
                  />
                )}
              />
            </View>
          </>
        )}
      </View>
      <Button onPress={submit} loading={isPetLoading}>
        Salvar
      </Button>
    </View>
  );
}
export default withKeyboardAwareScrollView(NewVaccineDose);
