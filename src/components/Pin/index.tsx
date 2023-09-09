import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { styles } from "./styles";
import { AvatarText } from "../AvatarText";
import { APPTHEME } from "../../styles/theme";

type PinProps = {
  text: string;
};

export function Pin({ text }: PinProps) {
  return (
    <View style={styles.pin}>
      <Image
        source={require("../../assets/elipse.png")}
        style={styles.pinImage}
      />
      <View style={styles.avatar}>
        <AvatarText
          label="L"
          size={40}
          backgroundColor={APPTHEME.colors.background}
          color={APPTHEME.colors.primary}
        />
      </View>
    </View>
  );
}
