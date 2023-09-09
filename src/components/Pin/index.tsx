import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { styles } from "./styles";
import { AvatarText } from "../AvatarText";
import { APPTHEME } from "../../styles/theme";
import { Avatar } from "react-native-paper";
import { AvatarIcon } from "../AvatarIcon";

type PinProps = {
  text?: string;
  isUser?: boolean;
};

export function Pin({ text, isUser }: PinProps) {
  return (
    <View style={styles.pin}>
      <Image
        source={require("../../assets/elipse.png")}
        style={styles.pinImage}
      />
      <View style={styles.avatar}>
        {isUser ? (
          <AvatarIcon
            icon="account"
            size={40}
            backgroundColor={APPTHEME.colors.background}
            color={APPTHEME.colors.primary}
          />
        ) : (
          <AvatarText
            label={text ? text[0] : ""}
            size={40}
            backgroundColor={APPTHEME.colors.background}
            color={APPTHEME.colors.primary}
          />
        )}
      </View>
    </View>
  );
}
