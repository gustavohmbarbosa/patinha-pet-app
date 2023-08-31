import React from "react";
import { View, Text } from "react-native";
import {
  Avatar as AvatarPaper,
  AvatarTextProps as AvatarTextPaperProps,
} from "react-native-paper";
import { APPTHEME } from "../../styles/theme";
import { styles } from "./styles";

type AvatarTextProps = AvatarTextPaperProps & {
  borderWhite?: boolean;
  title?: string;
  backgroundColor?: string;
};

// Ao usar o component, escolhe se a borda terá a cor do tema principal ou será branca
// title se refere ao nome do pet a baixo do avatar
export function AvatarText({
  borderWhite = false,
  label,
  title,
  size = 64,
  backgroundColor = APPTHEME.colors.other.gray,
  ...props
}: AvatarTextProps) {
  return (
    <View style={styles.container}>
      <AvatarPaper.Text
        {...props}
        size={size}
        label={label.toUpperCase()}
        style={{
          borderWidth: 2,
          borderColor: borderWhite
            ? APPTHEME.colors.neutrals.white
            : APPTHEME.colors.primary,
          backgroundColor: backgroundColor,
        }}
      />
      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
}
