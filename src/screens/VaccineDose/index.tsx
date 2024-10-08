import { useState } from "react";
import { View, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "../../components/TextInput";
import { DatePicker } from "../../components/DatePicker";
import { Button } from "../../components/Button";
import { withKeyboardAwareScrollView } from "../../components/withKeyboardAwareScrollView";
import { Switch } from "../../components/Switch";
import { InvalidFormText } from "../../components/Form/InvalidFormText";
import { usePet } from "../../hooks/usePet";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProps, StackRouterProps } from "../../routers/stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { maskNumberPositive } from "../../utils/masks";
import { styles } from "./styles";
import { UpdateVaccineDoseProps } from "../../lib/props/UpdateVaccineDoseProps";

type VaccineDoseForm = {
  scheduledDate: Date;
  vaccinatedDate?: Date;
  locale?: string;
  batch?: string;
  brand?: string;
  professional?: string;
  observation?: string;
};

type VaccineDoseProps = NativeStackScreenProps<
  StackNavigationProps,
  "VaccineDose"
>;

function VaccineDose({ route }: VaccineDoseProps) {
  const vaccineDose = route.params.vaccineDose;
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<VaccineDoseForm>({
    defaultValues: {
      scheduledDate: new Date(vaccineDose.scheduledDate),
      vaccinatedDate: vaccineDose.vaccinatedDate
        ? new Date(vaccineDose.vaccinatedDate)
        : undefined,
      batch: vaccineDose.batch ? vaccineDose.batch : undefined,
      brand: vaccineDose.brand ? vaccineDose.brand : undefined,
      locale: vaccineDose.locale ? vaccineDose.locale : undefined,
      professional: vaccineDose.professional
        ? vaccineDose.professional
        : undefined,
      observation: vaccineDose.observation
        ? vaccineDose.observation
        : undefined,
    },
  });

  const [additionalInfo, setAdditionalInfo] = useState(
    vaccineDose.vaccinatedDate ? true : false
  );

  const { isVaccineDosesLoading, updateVaccineDosePet } = usePet();

  const navigation = useNavigation<StackRouterProps>();

  const submit = handleSubmit(async (data) => {
    if (additionalInfo && !data.vaccinatedDate) {
      setError("vaccinatedDate", {
        message: "Insira a data de vacinação",
        type: "required",
      });
      return;
    }

    var updatedVaccineDose: UpdateVaccineDoseProps =
      {} as UpdateVaccineDoseProps;
    if (!additionalInfo) {
      updatedVaccineDose = {
        scheduledDate: data.scheduledDate,
      };
    } else {
      updatedVaccineDose = {
        scheduledDate: data.scheduledDate,
        vaccinatedDate: data.vaccinatedDate,
        batch: data.batch,
        brand: data.brand,
        locale: data.locale,
        observation: data.observation,
        professional: data.professional,
      };
    }

    const response = await updateVaccineDosePet(
      route.params.petId,
      vaccineDose.id,
      updatedVaccineDose
    );

    if (response) {
      navigation.goBack();
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.contentInputs}>
        <View style={styles.input}>
          <Controller
            name="scheduledDate"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePicker
                defaultValue={value}
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
                    defaultValue={value}
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
      <Button onPress={submit} loading={isVaccineDosesLoading}>
        Salvar
      </Button>
    </View>
  );
}
export default withKeyboardAwareScrollView(VaccineDose);
