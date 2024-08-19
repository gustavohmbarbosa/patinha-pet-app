import React, { ReactNode, useState } from "react";
import { Dimensions, View } from "react-native";

import { styles } from "./styles";
import { Tabs } from "../../components/Tabs";
import UserInfoForm from "./UserInfoForm";
import AddressForm from "./AddressForm";
import { CadastralHeader } from "../../components/CadastralHeader";
import { NewUserProps } from "../../lib/props/NewUserProps";
import UserCredentialsForm from "./UserCredentialsForm";

type headerOptionsProps = {
  header: {
    title: string;
    subtitle: string;
    goBack: "pages" | "tabs";
  };
  page: ReactNode;
};

export default function SignUp() {
  const windowHeight = Dimensions.get("window").height;
  const maxHeightHeader = Math.round(windowHeight * 0.3);

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
      page: <AddressForm newUser={newUser} />,
    },
  ];

  return (
    <View style={styles.container}>
      <Tabs.root headerVisible={false} disabledSwipe>
        {headerOptions.map(({ header, page }, index) => {
          return (
            <View key={index} style={styles.container}>
              <View style={{ maxHeight: maxHeightHeader }}>
                <CadastralHeader
                  maxHeightHeader={maxHeightHeader}
                  title={header.title}
                  subtitle={header.subtitle}
                  goBack={header.goBack}
                />
              </View>
              <Tabs.screen label="">{page}</Tabs.screen>
            </View>
          );
        })}
      </Tabs.root>
    </View>
  );
}
