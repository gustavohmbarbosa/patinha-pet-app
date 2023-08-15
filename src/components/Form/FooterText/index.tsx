import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

import { styles } from "./styles";

type FooterTextProps = {
  text: string;
  buttonText: string;
  onPress: () => void;
};

export function FooterText({ text, buttonText, onPress }: FooterTextProps) {
  return (
    <View style={styles.foot}>
      <Text style={styles.footTitle}>{text}</Text>
      <TouchableOpacity
        style={styles.footButton}
        activeOpacity={0.6}
        onPress={onPress}
      >
        <Text style={styles.secondary}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}
