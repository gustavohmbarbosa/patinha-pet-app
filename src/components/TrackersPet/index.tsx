import React from "react";
import { View, FlatList, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CardAlert } from "../CardAlert";
import { FabIconBottom } from "../FabIconBottom";

import { styles } from "./styles";
import { StackRouterProps } from "../../routers/stack";
import { PetProps } from "../../lib/props/PetProps";
import { useAuth } from "../../hooks/useAuth";

type TrackersPetProps = {
  pet: PetProps;
};

export function TrackersPet({ pet }: TrackersPetProps) {
  const { user } = useAuth();
  const navigation = useNavigation<StackRouterProps>();

  const decideRoute = () => {
    if (user.user.address.zipCode) {
      navigation.push("AddTrackerToPet", { pet });
    } else {
      Alert.alert(
        "Dados necessários",
        "Para cadastrar um rastreador, primeiro adicione seu endereço."
      );
      navigation.push("AdressInfo");
    }
  };

  return (
    <View style={styles.container}>
      <FabIconBottom icon={"plus"} onPress={decideRoute} />
      <FlatList
        style={styles.content}
        data={[]}
        renderItem={() => {
          return <></>;
        }}
        ListEmptyComponent={
          <CardAlert text="Você ainda não cadastrou nenhum rastreador para esse pet" />
        }
      />
    </View>
  );
}
