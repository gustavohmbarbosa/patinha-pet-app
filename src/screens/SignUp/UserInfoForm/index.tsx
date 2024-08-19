import { View } from "react-native";
import { useTabNavigation } from "react-native-paper-tabs";
import { Controller, useForm } from "react-hook-form";

import { Button } from "../../../components/Button";
import { TextInput } from "../../../components/TextInput";
import { InvalidFormText } from "../../../components/Form/InvalidFormText";
import { withKeyboardAwareScrollView } from "../../../components/withKeyboardAwareScrollView";
import { maskCellphone, maskCpf, removeMask } from "../../../utils/masks";

import { NewUserProps } from "../../../lib/props/NewUserProps";
import { styles } from "./styles";

type UserInfoFormProps = {
  newUser: NewUserProps;
  setNewUser: (newUser: NewUserProps) => void;
};

type FormDataProps = {
  name: string;
  cpf: string;
  phone_number: string;
};
function UserInfoForm({ newUser, setNewUser }: UserInfoFormProps) {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormDataProps>();

  const goTo = useTabNavigation();

  const submit = handleSubmit((data) => {
    const phoneNoMask = removeMask(data.phone_number);
    const cpfNoMask = removeMask(data.cpf);

    setNewUser({
      ...newUser,
      name: data.name.trim(),
      cpf: cpfNoMask,
      phone_number: phoneNoMask,
    });

    goTo(1);
  });

  return (
    <View style={styles.container}>
      <View style={styles.contentInputs}>
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
            rules={{ required: true }}
          />
          {errors.name && <InvalidFormText title="Insira o seu nome!" />}
        </View>
        <View style={styles.input}>
          <Controller
            name="cpf"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label="CPF"
                value={value}
                placeholder="000.000.000-00"
                onChangeText={(text) => onChange(maskCpf(text))}
                error={errors.cpf ? true : false}
                keyboardType="number-pad"
                maxLength={14}
              />
            )}
            rules={{
              validate: {
                value: () => {
                  const cpf = getValues("cpf");
                  return cpf.length === 14;
                },
              },
              required: {
                value: true,
                message: "Insira o seu CPF!",
              },
            }}
          />
          {errors.cpf && <InvalidFormText title="Insira o CPF completo!" />}
        </View>
        <View style={styles.input}>
          <Controller
            name="phone_number"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label="Celular"
                placeholder="(00) 00000-0000"
                value={value}
                maxLength={15}
                onChangeText={(text) => onChange(maskCellphone(text))}
                keyboardType="phone-pad"
              />
            )}
            rules={{
              validate: {
                value: () => {
                  const phone = getValues("phone_number");
                  return phone.length === 15;
                },
              },
              required: {
                value: true,
                message: "Insira o celular",
              },
            }}
          />
          {errors.phone_number && (
            <InvalidFormText
              title={errors.phone_number.message || "Insira o número completo"}
            />
          )}
        </View>
      </View>
      <Button onPress={submit}>Proximo</Button>
    </View>
  );
}

export default withKeyboardAwareScrollView(UserInfoForm);
