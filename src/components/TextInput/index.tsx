import React from "react";
import { View } from "react-native";
import {
  TextInput as TextInputPaper,
  TextInputProps,
} from "react-native-paper";

import { styles } from "./styles";

export function TextInput({ ...props }: TextInputProps) {
  return (
    <View style={styles.container}>
      <TextInputPaper
        {...props}
        // para usar icon basta passar no local desejado
        // icone referente ao vector icons => https://callstack.github.io/react-native-paper/docs/guides/icons
        // right={
        //   <TextInputPaper.Icon icon="cat" color={APPTHEME.colors.primary} />
        // }
        mode="outlined"
        style={styles.textInput}
        outlineStyle={styles.outlined}
      />
    </View>
  );
}
