import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { styles } from "./styles";
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

type addVaccineDoseForm = {
  vaccine: VaccineProps;
  scheduledDate: Date;
  pet: PetProps;
  vacinatedDate?: Date;
  dose?: string;
  locale?: string;
  batch?: string;
  brand?: string;
  professional?: string;
  observation?: string;
};

function NewVaccineDose() {
  const {
    control,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<addVaccineDoseForm>();

  const [additionalInfo, setAdditionalInfo] = useState(false);
  const [isDog, setIsDog] = useState(true);

  const { pets, dogVaccines, catVaccines } = usePet();

  const [petSelect, setPetSelect] = useState<PetProps>({} as PetProps);
  const [vaccineSelect, setVaccineSelect] = useState<VaccineProps>(
    {} as VaccineProps
  );

  const submit = handleSubmit(async (data) => {
    var newVaccineDose: NewVaccineDoseProps = data;
    if (!additionalInfo) {
      newVaccineDose = {
        // pet: data.pet,
        scheduledDate: data.scheduledDate,
        // vaccineName: data.vaccineName,
      };
    }
    console.log(newVaccineDose);
    console.log("PET => ", data.pet.id);
    console.log("Vaccina => ", data.vaccine.id);
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
                onChange={onChange}
                error={errors.scheduledDate ? true : false}
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
                name="vacinatedDate"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DatePicker onChange={onChange} />
                )}
              />
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
                name="dose"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    label="Dose"
                    placeholder="Dose"
                    value={value as string}
                    onChangeText={onChange}
                    error={errors.dose ? true : false}
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
      <Button onPress={submit}>Salvar</Button>
    </View>
  );
}
export default withKeyboardAwareScrollView(NewVaccineDose);
