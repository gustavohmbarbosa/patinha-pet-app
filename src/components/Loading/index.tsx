import React from "react";
import { View } from "react-native";

import { styles } from "./styles";
import { ActivityIndicator } from "react-native-paper";

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
}
