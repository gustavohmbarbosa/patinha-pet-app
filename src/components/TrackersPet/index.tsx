import React from "react";
import { View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTracker } from "../../hooks/useTrackers";
import { CardAlert } from "../CardAlert";
import { FabIconBottom } from "../FabIconBottom";

import { styles } from "./styles";
import { StackRouterProps } from "../../routers/stack";

export function TrackersPet() {
  const { trackers } = useTracker();
  const navigation = useNavigation<StackRouterProps>();

  // const decideRoute = () => {
  //   if (trackers.length > 0) {
  //     navigation.push("AddTracker");
  //   } else {
  //     navigation.push("Trackers");
  //   }
  // };

  return (
    <View style={styles.container}>
      <FabIconBottom
        icon={"plus"}
        onPress={() => {
          navigation.push("AddTrackerToPet");
        }}
      />
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
