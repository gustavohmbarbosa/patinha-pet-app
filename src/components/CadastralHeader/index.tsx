import React from "react";
import { View, Text, Dimensions } from "react-native";

import LogoImg from "../../assets/logo.svg";
import { styles } from "./styles";

type CadastralHeaderProps = {
  maxHeightHeader: number;
};

export function CadastralHeader({ maxHeightHeader }: CadastralHeaderProps) {
  return (
    <View style={styles.header}>
      <LogoImg
        style={styles.logo}
        width={"150%"}
        height={maxHeightHeader}
        rotation={-15}
      />
      <View style={styles.headerText}>
        <Text style={styles.headerTitle}>Login</Text>
        <Text style={styles.headerSubtitle}>
          Realize seu login ou registre-se
        </Text>
      </View>
    </View>
  );
}
