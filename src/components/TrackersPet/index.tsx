import React from "react";
import { View, FlatList } from "react-native";

import { styles } from "./styles";
import { CardEmptyList } from "../CardEmptyList";
import { FabIconBottom } from "../FabIconBottom";

export function TrackersPet() {
  return (
    <View style={styles.container}>
      <FabIconBottom icon={"plus"} onPress={() => {}} />
      <FlatList
        style={styles.content}
        data={[]}
        renderItem={() => {
          return <></>;
        }}
        ListEmptyComponent={
          <CardEmptyList text="Você ainda não cadastrou nenhum rastreador para esse pet" />
        }
      />
    </View>
  );
}
