import { View } from "react-native";

import { styles } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { InvalidFormText } from "../../components/Form/InvalidFormText";
import { maskCellphone, removeMask } from "../../utils/masks";
import { withKeyboardAwareScrollView } from "../../components/withKeyboardAwareScrollView";
import { useAuth } from "../../hooks/useAuth";
import { UpdateUserContactProps } from "../../lib/props/UpdateUserProps";

function UserInfo() {
  const { user, updateUserContact, isUserLoading } = useAuth();
  // o que vai fazer o gerenciamento dos dados e entender os erros dos inputs
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UpdateUserContactProps>({
    // informa os valores padrão dos campos
    defaultValues: {
      firstName: user.user.firstName,
      lastName: user.user.lastName,
      phone: maskCellphone(user.user.phone),
    },
  });

  // função de submit do form
  // necessário usar o do handleSbumit para obter os dados e executar a lógica que deseja
  const submit = handleSubmit(async (data) => {
    const phone = removeMask(data.phone);

    await updateUserContact({ ...data, phone: phone });
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
                  return password.length === 15;
                },
              },
              required: {
                value: true,
                message: "Insira o celular",
              },
            }}
          />
          {errors.phone && (
            <InvalidFormText
              title={errors.phone.message || "Insira o número completo"}
            />
          )}
        </View>
      </View>
      <Button onPress={submit} loading={isUserLoading}>
        Salvar
      </Button>
    </View>
  );
}

export default withKeyboardAwareScrollView(UserInfo);
