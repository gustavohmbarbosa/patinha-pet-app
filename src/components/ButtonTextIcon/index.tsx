import React, { ReactNode } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import {
  Button as ButtonPaper,
  ButtonProps as ButtonPaperProps,
} from "react-native-paper";

import { styles } from "./styles";

type ButtonProps = TouchableOpacityProps & {
  icon: ReactNode;
  label: string;
};

export function ButtonTextIcon({ icon, label, ...props }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.content} activeOpacity={0.7}>
      <View style={styles.icon}>{icon}</View>

      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}
