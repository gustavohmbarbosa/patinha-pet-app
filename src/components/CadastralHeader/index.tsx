import React from "react";
import { View, Text } from "react-native";

import LogoImg from "../../assets/logo.svg";
import { styles } from "./styles";

export function CadastralHeader() {
  return (
    <View style={styles.header}>
      <LogoImg style={styles.logo} width={"150%"} height={"100%"} rotation={-15} />
      <View style={styles.headerText}>
        <Text style={styles.headerTitle}>Login</Text>
        <Text style={styles.headerSubtitle}>
          Realize seu login ou registre-se
        </Text>
      </View>
    </View>
  );
}
