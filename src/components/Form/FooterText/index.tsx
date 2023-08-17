import React from "react";
import { TouchableOpacity, View, Text, TextStyle } from "react-native";

import { styles } from "./styles";

type FooterTextProps = {
  text: string;
  buttonText: string;
  onPress: () => void;
  buttonTextStyle?: TextStyle;
  disabled?: boolean;
};

export function FooterText({
  text,
  buttonText,
  onPress,
  buttonTextStyle,
  disabled = false,
}: FooterTextProps) {
  return (
    <View style={styles.foot}>
      <Text style={styles.footTitle}>{text}</Text>
      <TouchableOpacity
        style={styles.footButton}
        activeOpacity={0.6}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={[styles.secondary, buttonTextStyle]}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}
