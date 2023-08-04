import React from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";
import { FormExemple } from "../../components/FormExemple";

export function UserInfo() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FormExemple />
      </View>
    </View>
  );
}
