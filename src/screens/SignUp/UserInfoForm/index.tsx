import { View } from "react-native";
import { useTabNavigation } from "react-native-paper-tabs";
import { Controller, useForm } from "react-hook-form";

import { Button } from "../../../components/Button";
import { TextInput } from "../../../components/TextInput";
import { InvalidFormText } from "../../../components/Form/InvalidFormText";
import { withKeyboardAwareScrollView } from "../../../components/withKeyboardAwareScrollView";
import { maskCellphone } from "../../../utils/masks";

import { NewUserProps } from "../../../lib/props/NewUserProps";
import { styles } from "./styles";

type UserInfoFormProps = {
  newUser: NewUserProps;
  setNewUser: (newUser: NewUserProps) => void;
};

type FormDataProps = {
  firstName: string;
  lastName: string;
  phone?: string;
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
    var phoneNoMask = data.phone;
    if (phoneNoMask && phoneNoMask.length > 0) {
      phoneNoMask = phoneNoMask.replace(/\D/g, "");
    }

    setNewUser({
      ...newUser,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      phone: phoneNoMask ? phoneNoMask : null,
    });

    goTo(1);
  });

  return (
    <View style={styles.container}>
      <View style={styles.contentInputs}>
        <View style={styles.input}>
          <Controller
            name="firstName"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label="Nome"
                value={value}
                onChangeText={onChange}
                error={errors.firstName ? true : false}
              />
            )}
            rules={{ required: true }}
          />
          {errors.firstName && <InvalidFormText title="Insira o seu nome!" />}
        </View>
        <View style={styles.input}>
          <Controller
            name="lastName"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label="Sobrenome"
                value={value}
                onChangeText={onChange}
                error={errors.lastName ? true : false}
              />
            )}
            rules={{ required: true }}
          />
          {errors.lastName && (
            <InvalidFormText title="Insira o seu sobrenome!" />
          )}
        </View>
        <View style={styles.input}>
          <Controller
            name="phone"
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
                  const password = getValues("phone");
                  return (
                    password === undefined ||
                    (password !== undefined &&
                      (password.length === 0 || password.length === 15))
                  );
                },
              },
            }}
          />
          {errors.phone && <InvalidFormText title="Insira o número completo" />}
        </View>
      </View>
      <Button onPress={submit}>Proximo</Button>
    </View>
  );
}

export default withKeyboardAwareScrollView(UserInfoForm);
