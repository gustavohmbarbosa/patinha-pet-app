import { StyleSheet } from "react-native";
import { APPTHEME } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  content: {
    paddingHorizontal: 16,
    borderColor: APPTHEME.colors.primary,
    width: 156,
  },
  button: {
    borderRadius: 8,
  },
  label: {
    fontFamily: APPTHEME.font.body,
    fontSize: APPTHEME.fontsize.body.sm,
    lineHeight: APPTHEME.lineHeight.body.sm,
    letterSpacing: APPTHEME.letterSpacing.body.sm,
    color: APPTHEME.colors.text.dark,
  },
});
