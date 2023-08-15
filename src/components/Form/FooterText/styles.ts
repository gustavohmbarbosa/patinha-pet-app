import { StyleSheet } from "react-native";
import { APPTHEME } from "../../../styles/theme";

export const styles = StyleSheet.create({
  foot: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  footTitle: {
    fontFamily: APPTHEME.font.label.md,
    fontSize: APPTHEME.fontsize.label.md,
    lineHeight: APPTHEME.lineHeight.label.md,
    letterSpacing: APPTHEME.letterSpacing.label.md,
    color: APPTHEME.colors.text.dark,
    textAlign: "center",
  },
  footButton: {
    alignItems: "center",
  },
  secondary: {
    fontFamily: APPTHEME.font.label.md,
    fontSize: APPTHEME.fontsize.label.md,
    lineHeight: APPTHEME.lineHeight.label.md,
    letterSpacing: APPTHEME.letterSpacing.label.md,
    color: APPTHEME.colors.secondary,
  },
});
