import React from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";
import { FabIcon } from "../FabIcon";
import { APPTHEME } from "../../styles/theme";

export function CardVaccine() {
  return (
    <View style={styles.container}>
      <FabIcon icon="neddle" bgColor={APPTHEME.colors.other.khaki} />
      <View style={styles.content}>
        <Text style={styles.title}>Visita Vet</Text>
        <Text style={styles.subtitle}>Bobby</Text>
      </View>
    </View>
  );
}
