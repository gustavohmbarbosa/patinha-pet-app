import React, { ReactNode, useEffect, useState } from "react";
import { Dimensions, View } from "react-native";

import { styles } from "./styles";
import { Tabs } from "../../components/Tabs";
import UserInfoForm from "./UserInfoForm";
import AddressForm from "./AddressForm";
import { CadastralHeader } from "../../components/CadastralHeader";
import { api } from "../../services/api";
import { NewUserProps } from "../../lib/props/NewUserProps";
import UserCredentialsForm from "./UserCredentialsForm";
import { useTabIndex } from "react-native-paper-tabs";

type headerOptionsProps = {
  header: {
    title: string;
    subtitle: string;
    goBack: "pages" | "tabs";
  };
  page: ReactNode;
};

export function SignUp() {
  const windowHeight = Dimensions.get("window").height;
  const maxHeightHeader = Math.round(windowHeight * 0.3);

  const [headerIndex, setHeaderIndex] = useState(0);

  const [addressDisabled, setAddressDisabled] = useState(true);
  const [newUser, setNewUser] = useState<NewUserProps>({} as NewUserProps);

  const headerOptions: headerOptionsProps[] = [
    {
      header: {
        title: "Registre-se",
        subtitle: "Informe seus dados pessoais",
        goBack: "pages",
      },
      page: <UserInfoForm newUser={newUser} setNewUser={setNewUser} />,
    },
    {
      header: {
        title: "Dados de acesso",
        subtitle: "Informe seus dados de acesso",
        goBack: "tabs",
      },
      page: <UserCredentialsForm newUser={newUser} setNewUser={setNewUser} />,
    },
    {
      header: {
        title: "Endereço",
        subtitle: "Informe seu endereço atual",
        goBack: "tabs",
      },
      page: <AddressForm newUser={newUser} setNewUser={setNewUser} />,
    },
  ];
  return (
    <View style={styles.container}>
      <Tabs.root
        headerVisible={false}
        disabledSwipe
        onChangeIndex={(index) => {
          setHeaderIndex(index);
        }}
      >
        {headerOptions.map(({ header, page }, index) => {
          return (
            <Tabs.screen key={index} label="">
              <View style={styles.container}>
                <View style={{ maxHeight: maxHeightHeader }}>
                  <CadastralHeader
                    maxHeightHeader={maxHeightHeader}
                    title={header.title}
                    subtitle={header.subtitle}
                    goBack={header.goBack}
                  />
                </View>

                {page}
              </View>
            </Tabs.screen>
          );
        })}
      </Tabs.root>
    </View>
  );
}
