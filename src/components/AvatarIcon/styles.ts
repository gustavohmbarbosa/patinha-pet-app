import { StyleSheet } from "react-native";
import { APPTHEME } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  title: {
    fontFamily: APPTHEME.font.body,
    fontSize: APPTHEME.fontsize.body.sm,
    lineHeight: APPTHEME.lineHeight.body.sm,
    letterSpacing: APPTHEME.letterSpacing.body.sm,
    color: APPTHEME.colors.primary,
  },
});
