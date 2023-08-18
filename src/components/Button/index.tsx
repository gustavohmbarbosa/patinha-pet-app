import React from "react";
import { View } from "react-native";
import {
  Button as ButtonPaper,
  ButtonProps as ButtonPaperProps,
} from "react-native-paper";

import { styles } from "./styles";

type ButtonProps = ButtonPaperProps & {};

export function Button({ children, loading = false, ...props }: ButtonProps) {
  return (
    <View style={styles.container}>
      <ButtonPaper
        loading={loading}
        disabled={loading}
        mode="contained"
        style={[styles.button, loading ? { opacity: 0.8 } : {}]}
        contentStyle={styles.content}
        labelStyle={styles.label}
        {...props}
      >
        {loading ? <></> : <>{children}</>}
      </ButtonPaper>
    </View>
  );
}
