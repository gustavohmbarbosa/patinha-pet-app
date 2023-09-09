import React from "react";
import { FlatList, View } from "react-native";

import { styles } from "./styles";
import { FabIconBottom } from "../../components/FabIconBottom";
import { CardTracker } from "../../components/CardTracker";
import { TrackerProps } from "../../lib/props/TrackerProps";
import { CardAlert } from "../../components/CardAlert";
import { useTracker } from "../../hooks/useTrackers";

export default function Trackers() {
  const { trackers, isLoadingTrackers } = useTracker();
  return (
    <View style={styles.container}>
      <FabIconBottom icon="plus" onPress={() => {}} />
      <FlatList
        data={trackers}
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
