import React from "react";
import { FlatList, View } from "react-native";

import { styles } from "./styles";
import { FabIconBottom } from "../../components/FabIconBottom";
import { CardTracker } from "../../components/CardTracker";
import { CardAlert } from "../../components/CardAlert";
import { useTracker } from "../../hooks/useTrackers";
import { useNavigation } from "@react-navigation/native";
import { StackRouterProps } from "../../routers/stack";

export default function Trackers() {
  const { trackers, isTrackerLoading } = useTracker();
  const navigation = useNavigation<StackRouterProps>();
  return (
    <View style={styles.container}>
      <FabIconBottom
        icon="plus"
        onPress={() => {
          navigation.push("AddTracker");
        }}
      />
      <FlatList
        data={trackers}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          return <CardTracker model={item.model} code={item.code} />;
        }}
        ListEmptyComponent={
          <CardAlert text="Não há rastreadores vinculados a sua conta." />
        }
      />
    </View>
  );
}
