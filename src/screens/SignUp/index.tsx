import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";

import { styles } from "./styles";
import { Tabs } from "../../components/Tabs";
import SignUpUserInfoForm from "../../components/Form/SignUpUserInfoForm";
import SignUpAddressForm from "../../components/Form/SignUpAddressForm";
import { CadastralHeader } from "../../components/CadastralHeader";
import { api } from "../../services/api";
import { NewUserProps } from "../../lib/props/NewUserProps";

export function SignUp() {
  const windowHeight = Dimensions.get("window").height;
  const maxHeightHeader = Math.round(windowHeight * 0.3);

  const [addressDisabled, setAddressDisabled] = useState(true);

  const [newUser, setNewUser] = useState<NewUserProps>({} as NewUserProps);

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <View style={{ maxHeight: maxHeightHeader }}>
        <CadastralHeader
          maxHeightHeader={maxHeightHeader}
          title="Registre-se"
          subtitle="Realize o seu cadastro"
          goBack
        />
      </View>
      <>
        <Tabs.root disabled={addressDisabled}>
          <Tabs.screen label="Dados">
            <SignUpUserInfoForm
              newUser={newUser}
              setNewUser={setNewUser}
              setAddressDisabled={setAddressDisabled}
            />
          </Tabs.screen>
          <Tabs.screen label="Endereço" disabled={addressDisabled}>
            <SignUpAddressForm />
          </Tabs.screen>
        </Tabs.root>
      </>
    </View>
  );
}
