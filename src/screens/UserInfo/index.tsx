import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { InvalidFormText } from "../../components/Form/InvalidFormText";
import { maskCellphone, maskCpf, removeMask } from "../../utils/masks";
import { withKeyboardAwareScrollView } from "../../components/withKeyboardAwareScrollView";
import { useAuth } from "../../hooks/useAuth";
import { UpdateUserContactProps } from "../../lib/props/UpdateUserProps";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Loading } from "../../components/Loading";
import { styles } from "./styles";


function UserInfo() {
  const navigate = useNavigation();
  const { user, updateUserContact, getInfo, isUserLoading } = useAuth();
  const [isInfoLoading, setIsInfoLoading] = useState(true);
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<UpdateUserContactProps>({
    defaultValues: {
      name: user.name,
    },
  });

  const submit = handleSubmit(async (data) => {
    const phone = removeMask(data.phone_number);

    const success = await updateUserContact({ ...data, phone_number: phone });

    if (success) navigate.goBack();
  });

  async function getUserInfo() {
    setIsInfoLoading(true);
    const user = await getInfo();

    if (user) {
      setValue("name", user.name);
      setValue("phone_number", maskCellphone(user.phone_number));
      setCpf(maskCpf(user.cpf));
      setEmail(user.email)
    }

    setIsInfoLoading(false);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      {isInfoLoading ? (
        <Loading />
      ) : (
        <>
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
              <TextInput
                label="CPF"
                value={cpf}
                disabled
              />
            </View>
            <View style={styles.input}>
              <TextInput
                label="E-mail"
                value={email}
                disabled
              />
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
                      const password = getValues("phone_number");
                      return password.length === 15;
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
                  title={
                    errors.phone_number.message || "Insira o número completo"
                  }
                />
              )}
            </View>
          </View>
          <Button onPress={submit} loading={isUserLoading}>
            Salvar
          </Button>
        </>
      )}
    </View>
  );
}

export default withKeyboardAwareScrollView(UserInfo);
