import React from "react";
import { View } from "react-native";
import {
  Button as ButtonPaper,
  ButtonProps as ButtonPaperProps,
} from "react-native-paper";

import { styles } from "./styles";

type ButtonProps = ButtonPaperProps & {};

export function Button({ children, ...props }: ButtonProps) {
  return (
    <View style={styles.container}>
      <ButtonPaper
        mode="contained"
        style={styles.button}
        contentStyle={styles.content}
        labelStyle={styles.label}
        {...props}
      >
        {children}
      </ButtonPaper>
    </View>
  );
}
