import React from "react";
import { FlatList, View } from "react-native";
import { Portal } from "react-native-paper";

import { styles } from "./styles";
import { CardAlert } from "../../components/CardAlert";
import { usePet } from "../../hooks/usePet";
import { Loading } from "../../components/Loading";
import { CardPet } from "../../components/CardPet";
import { FabIconBottom } from "../../components/FabIconBottom";
import { useNavigation } from "@react-navigation/native";
import { StackRouterProps } from "../../routers/stack";

export default function Home() {
  const { pets, isPetLoading } = usePet();
  const navigation = useNavigation<StackRouterProps>();

  return (
    <Portal.Host>
      <View style={styles.container}>
        <FabIconBottom icon="plus" onPress={() => navigation.push("NewPet")} />
        {isPetLoading ? (
          <View style={styles.center}>
            <Loading />
          </View>
        ) : (
          <FlatList
            data={pets}
            renderItem={({item, index}) => {
              return <CardPet key={index} pet={item} />;
            }}
            ListEmptyComponent={<CardAlert text="Cadastre um pet" />}
            style={styles.list}
            contentContainerStyle={styles.content}
          />
        )}
      </View>
    </Portal.Host>
  );
}
